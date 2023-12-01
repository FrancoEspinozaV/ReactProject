import { Movies } from './component/Movies'
import { useMovies } from './hooks/useMovie'
import './App.css'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const { movies: mappedMovies, getMovies, loading } = useMovies({ sort })

  const debounceGetMovies = useCallback(
    debounce((Search) => {
      getMovies({ Search })
    }, 500),
    [getMovies]
  )
  const handleSort = () => {
    setSort(!sort)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const { Search } = Object.fromEntries(new window.FormData(event.target))
    getMovies({ Search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h2>Busqueda de peliculas</h2>
        <form className='form' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name='Search'
            type='text'
            placeholder='Star Wars, The Matrix, ...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>Buscar</button>
        </form>
      </header>

      <main>
        {loading ? <p>Cargando ...</p> : <Movies movies={mappedMovies} />}
      </main>
    </div>
  )
}

export default App
