import { useEffect, useState } from 'react'

const ENDPOINT_CAT_FACT = 'https://catfact.ninja/fact'
// const ENDPOINT_CAT_IMG =
// `
function App() {
  const [fact, setFact] = useState('')
  const [imagenUrl, setImagenUrl] = useState()

  useEffect(() => {
    async function getRandomFact() {
      const res = await fetch(ENDPOINT_CAT_FACT)
      const json = await res.json()
      const { fact } = json
      setFact(fact)
    }
    getRandomFact()
  }, [])

  useEffect(() => {
    if (!fact) return
    const word = fact.split(' ', 3).join(' ')
    setImagenUrl(
      `https://cataas.com/cat/says/${word}?fontSize=55&fontColor=red`
    )
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imagenUrl && (
          <img src={imagenUrl} alt='meme the cat with random fact' />
        )}
      </section>
    </main>
  )
}

export default App
