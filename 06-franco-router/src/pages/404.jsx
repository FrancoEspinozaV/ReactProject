import { Link } from '../component/Link'

export function Error404() {
  return (
    <main className='wrapper'>
      <h1 className='text-404'>404</h1>
      <p>
        <strong>Not Found</strong>: This page could not be found
      </p>
      <Link to={'/'}>Go to Home</Link>
    </main>
  )
}
