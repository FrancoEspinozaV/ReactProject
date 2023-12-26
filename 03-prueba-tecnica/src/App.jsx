import { useCatFact, useCatImage } from './servece/hooks/useCat'
// test 
function App() {
  const { fact, refreshFact } = useCatFact()
  const { imagenUrl } = useCatImage({ fact })

  const handleClick = () => {
    refreshFact()
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
