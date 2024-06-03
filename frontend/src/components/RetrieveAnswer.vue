<template>
  <div class="pt-6 is-flex-direction-row is-align-items-center form-container">
    <h1 class="pb-6 has-text-primary has-text-centered">Chat with DocMate</h1>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label has-text-primary">Pinecone</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="is-expanded has-icons-left ">
            <input class="input has-background-grey-darker has-text-primary" v-model="pIndex" placeholder="Pinecone Index">
            <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
          </p>
        </div>
        <div class="field">
          <p class="is-expanded has-icons-left has-icons-right">
            <input class="input has-background-grey-darker has-text-primary" v-model="pName" placeholder="Pinecone Namespace">
            <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
            <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label has-text-primary">Pinecone API-Key</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input type="password" class="input has-background-grey-darker has-text-primary" v-model="pKey" placeholder="Pinecone API-Key">
          </div>
        </div>
      </div>
    </div>


    <div class="field is-horizontal mt-5">
      <div class="field-label is-normal">
        <label class="label has-text-primary">OpenAI API-Key</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control justify-center">
            <input type="password" class="input has-background-grey-darker has-text-primary" v-model="openAIKey" placeholder="OpenAI API-Key">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label has-text-primary">LLM</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <div class="select is-fullwidth">
            <select class="has-background-grey-darker has-text-primary" v-model="selectedLlm" placeholder="Select">
              <option>{{ LanguageModel.GROQ }}</option>
              <option>{{ LanguageModel.OPENAI }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <br>
  <div class="field is-horizontal mt-5">
    <div class="field-label is-normal">
      <label class="label has-text-primary">Question</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input class="input has-background-grey-darker has-text-primary" v-model="query" placeholder="Question">
        </div>
      </div>
    </div>
  </div>
  <br>
  <br>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button is-white" @click="handleSubmit" >
          Retrieve Answer
        </button>
      </div>
    </div>
  </div>

  <br>
  <br>
  <progress  v-if="embedding === EmbeddingCase.LOADING" class="progress is-small is-primary" max="100"></progress>
  <article class="message is-primary form-container" v-if="responseMessage">
    <div class="message-header">
      <p>Answer</p>
    </div>
    <div class="message-body"  v-if="responseMessage">
     {{ responseMessage}}
    </div>
  </article>



</template>


<script setup lang="ts">
import { useConfigStore } from '../stores/config'
import { ref } from 'vue'
import { defaultAxios } from '../axios'
import type { RetrieveAnswerRequest } from '../types/RetrieveAnswerRequest'
import { EmbeddingCase } from '../types/EmbeddingCase'
import { LanguageModel } from '../types/LanguageModel'

const store = useConfigStore();
const { pineconeKey, openAiKey, namespace, pineconeIndex, setApiKeys } = store

const pIndex = ref<string>(import.meta.env.VITE_PINECONE_INDEX || pineconeIndex || '')
const pName = ref<string>(import.meta.env.VITE_PINECONE_NAME || namespace || '')
const pKey = ref<string>(import.meta.env.VITE_PINECONE_API_KEY || pineconeKey || '')
const openAIKey = ref<string>(import.meta.env.VITE_OPENAI_API_KEY || openAiKey || '')
const selectedLlm = ref<LanguageModel>(LanguageModel.GROQ)
const query = ref<string>('')
const responseMessage = ref<string>('')


const embedding = ref<EmbeddingCase>(EmbeddingCase.NOT_STARTED);
async function handleSubmit(): Promise<void> {
  embedding.value = EmbeddingCase.LOADING

  setApiKeys(pKey.value, pIndex.value, openAIKey.value,  pName.value);

  const request: RetrieveAnswerRequest = {
    query: query.value,
    pIndex: pIndex.value,
    pName: pName.value,
    pKey: pKey.value,
    openAIKey: openAIKey.value,
    selectedLlm: selectedLlm.value,
  }
  try {
    const response = await defaultAxios.post('retrieve', request);
    responseMessage.value = response.data.text
  } catch {
    console.error('An error occurred');
  }
  embedding.value = EmbeddingCase.FINISHED
}

</script>

<style scoped>
h1 {
  font-size: 2em;
}

.control {
  text-align: center;
}
.message-body {
  max-width: 40em;
  margin: auto;
}
::placeholder {
  color: white;
}
</style>