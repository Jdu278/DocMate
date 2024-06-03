import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const pineconeKey = ref<string>('');
  const pineconeIndex = ref<string>('')
  const openAiKey = ref<string>('');
  const namespace = ref<string>('')

  function setApiKeys(pKey: string, pIndex: string, oAKey: string, nSpace: string) {
    pineconeKey.value = pKey;
    pineconeIndex.value = pIndex;
    openAiKey.value = oAKey;
    namespace.value = nSpace;
  }

  return { pineconeKey, pineconeIndex, openAiKey, namespace, setApiKeys };
})
