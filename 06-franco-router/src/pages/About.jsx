import { Link } from '../component/Link'

export function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Mi nombre es Franco Espinoza y estoy creando un clon de React Router
      </p>
      <div>
        <img
          width={300}
          height={400}
          src='https://i.imgur.com/FYoQoiG.jpg'
          alt='Foto de Franco Espinoza'
        />
      </div>
      <Link to='/'>Ir al inicio</Link>
    </>
  )
}
