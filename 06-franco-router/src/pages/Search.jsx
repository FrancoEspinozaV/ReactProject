import { Link } from '../component/Link'

export function Search({ routParams }) {
  return (
    <>
      <h1>has buscado: {routParams.query}</h1>
      <Link to='/'>Ir al inicio</Link>
    </>
  )
}
