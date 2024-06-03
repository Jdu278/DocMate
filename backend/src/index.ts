import express from 'express'
import bodyParser from 'body-parser'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { Document } from 'langchain/document'
import { Pinecone, PineconeConfiguration } from '@pinecone-database/pinecone'
import { PineconeStore } from '@langchain/pinecone'
import { OpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import multer from 'multer'
import fs from 'fs/promises'
import { RetrievalQAChain } from 'langchain/chains'
import { ChatGroq } from '@langchain/groq'
import { RetrieveAnswerRequest } from './types/RetrieveAnswerRequest'
import { LanguageModel } from './types/LanguageModel'
import 'dotenv/config'


// Configure storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

// Delete files after usage
async function deleteFiles(files: Express.Multer.File[]): Promise<void> {
  const deletePromises = files.map(file => fs.unlink(file.path));
  await Promise.all(deletePromises);
}


const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  next();
});

app.post('/embed', upload.array('files'), async (req, res) => {

  const { pIndex, pKey, openAIKey, pName } = req.body
  const files = req.files as Express.Multer.File[]

  if (!files) {
    res.sendStatus(400)
    throw new Error('No files were found');
  }

  try {
    const pinecone = new Pinecone({ apiKey: pKey });
    const pineconeIndex = pinecone.Index(pIndex)

    const loadPromises = files.map((file: { path: string | Blob; }) => {
        const loader = new PDFLoader(file.path, { splitPages: true });
        return loader.load();
      });

      const docs = await Promise.all(loadPromises);

    /* Additional steps : Split text into chunks with any TextSplitter. You can then use it as context or save it to memory afterwards. */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const flattenedDocs = docs.flat();
    const documentInstances = flattenedDocs.map((doc: { pageContent: any, metadata: any }) => new Document({ pageContent: doc.pageContent, metadata: doc.metadata }));

    const splitDocs = await textSplitter.splitDocuments(documentInstances);

 await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings({ openAIApiKey: openAIKey }), {
      pineconeIndex,
      maxConcurrency: 5,
      namespace: pName
    });
    await deleteFiles(files)
    res.sendStatus(200);
  } catch (error) {
    await deleteFiles(files)
    res.sendStatus(403)
    throw new Error('Error occured while uploading the files');
  }

});

app.post('/retrieve', async (req, res) => {
  const requestData: RetrieveAnswerRequest = req.body;

  const { query, pKey, pIndex, pName, openAIKey, selectedLlm } = requestData;

  const pineconeConfig: PineconeConfiguration = {
    apiKey: pKey
  }
  const pinecone = new Pinecone(pineconeConfig);

  let model: ChatGroq | OpenAI

  switch (selectedLlm) {
    case LanguageModel.GROQ: {
      model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: "llama3-8b-8192"
      });
      break
    }
    case LanguageModel.OPENAI: {
       model = new OpenAI({ openAIApiKey: openAIKey });
      break
    }
    default: {
      res.sendStatus(400)
      throw Error(`Unsupported language model: ${selectedLlm}`);
    }
}

  const pineconeIndex = pinecone.Index(pIndex);


  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(({ openAIApiKey: openAIKey })), // @ts-ignore
    { pineconeIndex, namespace: pName }
  );

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    returnSourceDocuments: true,
  });

  const response = await chain.invoke({
    query,
  });

  return res.send(response)
})

// start server
const port = process.env.PORT || 4008;
app.listen(port, () => {
  console.log('DocMate backend running...')
})
