<template>
  <div class="pt-6 m-4 is-flex-direction-row is-align-items-center container">
    <h1 class="pb-6 has-text-primary has-text-centered">DocMate Wiki</h1>
    <div class="field is-vertical flex overflow-auto">
      <h2 class="has-text-primary is-underlined pb-3">How to upload your documents</h2>
      <p class="has-text-white">After completing the setup from the page <a href="setup-wiki">Set-up</a>, you can now start to upload your documents.</p>
      <h3 class="has-text-primary pt-4 pb-2">Upload:</h3>
      <ol class="has-text-white">
        <li>Fill out the <a href="https://www.pinecone.io/" target="_blank">Pinecone Index</a> (this is the name of the index you created on Pinecone)</li>
        <li>Fill in a namespace (You added your documents to a certain namespace in the previous step. You can now query documents from any namespace you created)</li>
        <li>Add your Pinecone API key from the setup</li>
        <li>Add your OpenAI API key from the setup</li>
        <li>Choose the model you want to use to answer your questions: Llama3 (currently free to use), or GPT 3.5 Turbo (via your account)</li>
        <li>Add your question and press Enter</li>
      </ol>
      <br>
    </div>
    <h2 class="has-text-primary is-underlined pb-3">How to use the Chat</h2>
    <p class="has-text-white">After following the tutorial above where you upload your documents, you can now start to chat with them</p>
    <br>
    <h3 class="has-text-primary pt-4 pb-2">Chat:</h3>
    <ol class="has-text-white">
      <li>Navigate to the page <router-link to="/" class="has-text-primary nav-link">Set-up</router-link>.</li>
      <li>Fill out the <a href="https://www.pinecone.io/" target="_blank">Pinecone Index</a> (this is the name of the index you created on Pinecone)</li>
      <li>Fill in a namespace. Depending on the name of the namespace, your documents will either be added to an existing namespace, or if the namespace does not exist, it will be created</li>
      <li>Add your Pinecone API key from the setup</li>
      <li>Add your OpenAI API key from the setup</li>
      <li>Choose the documents you want to upload (currently only PDF documents work)</li>
    </ol>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.2em;
}
.container {
  max-width: 40em !important;
}
::placeholder {
  color: white;
}
ol {
  padding-left: 1.5em;
}
</style>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>