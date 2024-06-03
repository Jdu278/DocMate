import type { LanguageModel } from './LanguageModel'

export interface RetrieveAnswerRequest {
  query: string
  pIndex: string
  pName: string
  pKey: string
  openAIKey: string
  selectedLlm: LanguageModel
}