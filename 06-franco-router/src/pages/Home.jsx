import { Link } from '../Link'

export function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para el React Roter desde 0</p>
      <Link to='/about'>Ir a sobre nosotros</Link>
    </>
  )
}
