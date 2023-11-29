import { useEffect, useState } from 'react'
import { getRandomFact } from './servece/fact'

function App() {
  const [fact, setFact] = useState('')
  const [imagenUrl, setImagenUrl] = useState()

  useEffect(() => {
    getRandomFact().then(setFact)
  }, [])

  useEffect(() => {
    if (!fact) return
    const word = fact.split(' ', 3).join(' ')
    setImagenUrl(
      `https://cataas.com/cat/says/${word}?fontSize=55&fontColor=red`
    )
  }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }
  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>get Random fact</button>
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
