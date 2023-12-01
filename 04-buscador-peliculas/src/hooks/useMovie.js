import { useMemo, useState } from 'react'
import { searchMovies } from '../service/movies'

export function useMovies({ sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [prevSearch, setPrevSearch] = useState()

  const getMovies = async ({ Search }) => {
    if (Search === prevSearch) return

    try {
      setLoading(true)
      setError(null)
      setPrevSearch(Search)
      const newMovies = await searchMovies({ Search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const sortedMovies = useMemo(
    () =>
      sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies,
    [movies, sort]
  )

  return { movies: sortedMovies, getMovies, loading, error }
}
