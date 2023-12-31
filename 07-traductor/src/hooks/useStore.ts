import { useReducer } from 'react'
import { type State, Action, Language, FromLanguage } from '../types.d'
import { ACTIONS, AUTO_LENGUAGE } from '../constantes'

const initState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

function reducer(state: State, action: Action) {
  const { type } = action
  if (type === ACTIONS.INTER_CHANGE) {
    if (state.fromLanguage === AUTO_LENGUAGE) return state
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    }
  }

  if (type === ACTIONS.SET_FROM_LANGUAGE) {
    return {
      ...state,
      fromLanguage: action.payload,
    }
  }

  if (type === ACTIONS.SET_TO_LANGUAGE) {
    return {
      ...state,
      ToLanguage: action.payload,
    }
  }

  if (type === ACTIONS.SET_FROM_TEXT) {
    return {
      ...state,
      fromText: action.payload,
      loading: true,
      result: '',
    }
  }

  if (type === ACTIONS.SET_RESULT) {
    return {
      ...state,
      result: action.payload,
      loading: false,
    }
  }

  return state
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initState)

  const interChangeLanguage = () => {
    dispatch({ type: ACTIONS.INTER_CHANGE })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: ACTIONS.SET_FROM_LANGUAGE, payload })
  }
  const setToLanguage = (payload: Language) => {
    dispatch({ type: ACTIONS.SET_TO_LANGUAGE, payload })
  }
  const setFromText = (payload: string) => {
    dispatch({ type: ACTIONS.SET_FROM_TEXT, payload })
  }
  const setResult = (payload: string) => {
    dispatch({ type: ACTIONS.SET_RESULT, payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interChangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  }
}
