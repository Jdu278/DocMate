<template>
  <div class="pt-6 is-flex-direction-row is-align-items-center form-container">
    <h1 class="pb-6 has-text-primary has-text-centered">Upload Documents</h1>
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
          <div class="control">
            <input  type="password" class="input has-background-grey-darker has-text-primary" v-model="openAIKey" placeholder="OpenAI API-Key">
          </div>
        </div>
      </div>
    </div>

    <div class="file is-fullwidth  has-name is-primary mt-6">
      <div class="field-label is-normal">
        <label class="label has-text-primary">Fileupload</label>
      </div>
      <label class="file-label ml-4">
        <input class="file-input" type="file" name="docs" accept=".pdf,.doc,.docx" multiple @change="handleFileChange" />
        <span class="file-cta has-text-black">
      <span class="file-icon">
        <i class="fas fa-upload"></i>
      </span>
      <span class="file-label has-text-black"> Choose a file… </span>
    </span>
        <span class="file-name">{{ selectedFile.toString() }}</span>
      </label>
    </div>

    <div class="columns is-centered mt-6">
      <div class="column is-narrow">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-white" @click="handleSubmit">
                  EmbeddDocs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="mt-4">
        <progress  v-if="embedding === EmbeddingCase.LOADING" class="progress is-small is-primary" max="100"></progress>
        <article class="message is-primary" v-if="embedding === EmbeddingCase.FINISHED">
          <div class="message-header">
            <p>Finished</p>
          </div>
          <div class="message-body">
            Finished successfully.
          </div>
        </article>
        <article class="message is-primary" v-if="embedding === EmbeddingCase.ERROR">
          <div class="message-header">
            <p>Finished</p>
          </div>
          <div v-if="embedding === EmbeddingCase.ERROR" class="message-body">
            Unknown error occurred. Please try again later.
          </div>
        </article>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EmbeddingCase } from '../types/EmbeddingCase'
import { useConfigStore } from '../stores/config'
import { defaultAxios } from '../axios'

const { setApiKeys } = useConfigStore();

const pIndex = ref<string>(import.meta.env.VITE_PINECONE_INDEX || '')
const pName = ref<string>(import.meta.env.VITE_PINECONE_NAME || '')
const pKey = ref<string>(import.meta.env.VITE_PINECONE_API_KEY ||'')
const openAIKey = ref<string>(import.meta.env.VITE_OPENAI_API_KEY || '')
const selectedFile = ref(['*.pdf']);

const embedding = ref<EmbeddingCase>(EmbeddingCase.NOT_STARTED);


function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = Array.from(target.files).map(file => file.name);
  }
}

async function handleSubmit(): Promise<void> {
  embedding.value = EmbeddingCase.LOADING;
  setApiKeys(pKey.value, pIndex.value, openAIKey.value,  pName.value);

  const formData = new FormData();
  formData.append('pIndex', pIndex.value);
  formData.append('pKey', pKey.value);
  formData.append('pName', pName.value);
  formData.append('openAIKey', openAIKey.value);
  const files = (document.querySelector('input[type="file"]') as HTMLInputElement).files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  }

  try {
    await defaultAxios.post('embed', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    embedding.value = EmbeddingCase.FINISHED;
  } catch {
    console.error('An error occurred');
    embedding.value = EmbeddingCase.ERROR;
  }
}

</script>

<style scoped>
h1 {
  font-size: 2em;
}
.form-container {
  max-width: 40em;
}
::placeholder {
  color: white;
}
</style>