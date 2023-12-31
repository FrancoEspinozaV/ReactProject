import { ACTIONS, AUTO_LENGUAGE, SUPPORTED_LANGUAGE } from './constantes'

export type Language = keyof typeof SUPPORTED_LANGUAGE
export type AutoLanguage = typeof AUTO_LENGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action =
  | { type: ACTIONS.INTER_CHANGE }
  | { type: ACTIONS.SET_FROM_LANGUAGE; payload: string }
  | { type: ACTIONS.SET_TO_LANGUAGE; payload: string }
  | { type: ACTIONS.SET_FROM_TEXT; payload: string }
  | { type: ACTIONS.SET_RESULT; payload: string }

export enum SectionType {
  From = 'from',
  To = 'to',
}
