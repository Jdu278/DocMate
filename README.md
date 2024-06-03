# DocMate
This project is a working full-stack application that lets you embed your personal PDF documents and ask questions about them.
It is built upon [langchain.js](https://js.langchain.com/v0.2/docs/introduction/) and was inspired by Eden Marco's python course [LangChain- Develop LLM powered applications with LangChain](https://www.udemy.com/course/langchain/) on Udemy.
## Progress
Currently, you can embed your documents and ask a single question. In the future, I plan to integrate a chat component where you can get a proper chat experience with chat history. Furthermore, I would like to make the tool responsive.
Test it out here: [DocMate](https://retrievaltool-frontend.onrender.com/setup-wiki).
## Tutorial
A tutorial to embed your documents can be [found here](https://retrievaltool-frontend.onrender.com/setup-wiki).
A tutorial on how to use the chat afterward can be [found here](https://retrievaltool-frontend.onrender.com/chat-wiki).
## Run
Use node version 20.
### Backend
Navigate to `/backend` and run:
```
npm install
```
```
npm run start
```
### Frontend
Navigate to `/frontend` and run:
```
npm install
```
```
npm run dev
```
Either add the necessary keys to the `.env.` file or add them directly in the UI (they won't be saved and you would have to re-enter them).
```
VITE_PINECONE_API_KEY= *** Your Pinecone API Key ***
VITE_OPENAI_API_KEY= *** Your OpenAI API Key ***
VITE_SELECTED_LLM= *** Either 'GPT-3.5 Turbo' or 'Llama3 (Groq)'***
VITE_BACKEND_URL= *** URL of the backend. 'http://localhost:4008' in dev mode. ***
```
## Stack
Both front- and backend are written in Typescript.
### Frontend
- [Vue.js](https://vuejs.org/)
- [Bulma CSS](https://bulma.io/)
### Backend
- [Express.js](http://expressjs.com/)
- [Langchain.js](https://js.langchain.com/v0.2/docs/introduction/)
