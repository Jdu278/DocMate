<template>
  <div class="pt-6 m-4 is-flex-direction-row is-align-items-center container">
    <h1 class="pb-6 has-text-primary has-text-centered">DocMate Wiki</h1>
    <div class="field is-vertical flex overflow-auto">
      <h2 class="has-text-primary is-underlined pb-3">Set up Pinecone (5 mins)</h2>
      <p class="has-text-white">In this step, we'll set up a Pinecone account, which is completely free and doesn't require any identification or a credit card. Once the account is ready, we'll create our first "index." Imagine an index as a big digital shelf where you can store all sorts of documents.
        <br>
        <br>
        Within each index, we can create up to 100 "namespaces" — these are like labeled folders within our shelf. For example, if you have plenty of academic papers, you can create an index called 'Academic Paper.' Within this index, you can now create a namespace 'Sociology' where you can store all your sociology papers.</p>
      <h3 class="has-text-primary pt-4 pb-2">Create Account & Index:</h3>
      <ol class="has-text-white">
        <li>Go to <a href="https://www.pinecone.io/" target="_blank">pinecone.io</a></li>
        <li>After registration, log into your account</li>
        <li>Go to Indexes -> 'Create Index'</li>
        <li>Enter your Index name <span class="has-text-warning">- save this because you will need it later -</span></li>
        <li>Under Configuration, choose 1536 for Dimension and cosine for Metric</li>
        <li>Under Capacity Mode, choose Serverless</li>
        <li>Under Cloud Provider, choose AWS</li>
        <li>Under Region, choose Virginia, us-east-1</li>
        <li>Click 'Create Index'</li>
      </ol>
      <h3 class="has-text-primary pt-4 pb-2">Create and retrieve API key:</h3>
      <ol class="has-text-white">
        <li>At your Pinecone dashboard, go to 'Manage' -> 'API-Keys'</li>
        <li>Click on the button 'Create API Key'</li>
        <li>Name it DocMateKey or whatever you like</li>
        <li><span class="has-text-warning">Copy the key and save it for later use</span></li>
      </ol>
      <h2 class="has-text-primary is-underlined pt-4 pb-3">Set up OpenAI (5 mins)</h2>
      <p class="has-text-white">In this step, we'll set up an OpenAI account. Creating the account is free, but later we need to add some credits to our account to use the embedding model of OpenAI.
        <br>
        <br>
        Follow these steps to create your OpenAI account and retrieve your API key:
      </p>
      <h3 class="has-text-primary pt-4 pb-2">Create Account & Retrieve API Key:</h3>
      <ol class="has-text-white">
        <li>Visit <a href="https://www.openai.com/" target="_blank">OpenAI's website</a> and click on 'Sign Up'.</li>
        <li>Complete the registration process</li>
        <li>Once registered, log into your OpenAI account</li>
        <li>Navigate to the 'API-Key' section in the left menu bar</li>
        <li>Click on 'Create new secret key'</li>
        <li>Label your new API key appropriately and click 'Create' (for the project you can just use 'Default Project')</li>
        <li><span class="has-text-warning">Copy the key and save it for later use</span></li>
      </ol>
    </div>
    <br>
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
</script>
