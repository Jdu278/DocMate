import {RetrieveAnswerRequest} from "./types/RetrieveAnswerRequest";
import {Pinecone, PineconeConfiguration} from "@pinecone-database/pinecone";
import {ChatGroq} from "@langchain/groq";
import {OpenAI, OpenAIEmbeddings} from "@langchain/openai";
import {LanguageModel} from "./types/LanguageModel";
import {PineconeStore} from "@langchain/pinecone";
import {RetrievalQAChain} from "langchain/chains";
import express from "express";

const retrieveRouter = express.Router();
retrieveRouter.post('/retrieve', async (req, res) => {
    const { query, pKey, pIndex, pName, openAIKey, selectedLlm }: RetrieveAnswerRequest = req.body;

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

export { retrieveRouter }