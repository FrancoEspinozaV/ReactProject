const API_KEY = import.meta.env.VITE_API_KEY

export async function searchMovies({ Search }) {
  if (Search === '') return null
  const URL_API = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${Search}`

  try {
    const result = await fetch(URL_API)
    const json = await result.json()

    const movies = json?.Search
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
