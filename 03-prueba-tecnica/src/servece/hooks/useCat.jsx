import { useEffect, useState } from 'react'
import { getRandomFact } from '../fact'

export function useCatImage({ fact }) {
  const [imagenUrl, setImagenUrl] = useState()

  useEffect(() => {
    if (!fact) return
    const word = fact.split(' ', 3).join(' ')
    setImagenUrl(
      `https://cataas.com/cat/says/${word}?fontSize=55&fontColor=red`
    )
  }, [fact])

  return { imagenUrl }
}

export function useCatFact() {
  const [fact, setFact] = useState('')

  const refreshFact = () => {
    getRandomFact().then(setFact)
  }
  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
