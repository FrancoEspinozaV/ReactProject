import { Movies } from './component/Movies'
import { useMovies } from './hooks/movie'
import './App.css'

function App() {
  const { movies: mappedMovies } = useMovies()

  return (
    <div className='page'>
      <header>
        <h2>Busqueda de peliculas</h2>
        <form className='form'>
          <input type='text' placeholder='Star Wars, The Matrix, ...' />
          <button>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  )
}

export default App
