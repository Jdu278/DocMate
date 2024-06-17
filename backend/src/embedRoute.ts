import {Pinecone} from "@pinecone-database/pinecone";
import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {Document} from "langchain/document";
import {PineconeStore} from "@langchain/pinecone";
import {OpenAIEmbeddings} from "@langchain/openai";
import express from "express";
import multer from "multer";
import fs from "fs/promises";

const embedRouter = express.Router();

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

async function deleteFiles(files: Express.Multer.File[]): Promise<void> {
    const deletePromises = files.map(file => fs.unlink(file.path));
    await Promise.all(deletePromises);
}
embedRouter.post('/embed', upload.array('files'), async (req, res) => {

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

export { embedRouter }