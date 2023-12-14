import { useI18n } from '../../i18n'
import { Link } from '../component/Link'

export function AboutPage({ routParams }) {
  const i18n = useI18n(routParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <div>
        <img
          width={300}
          height={400}
          src='https://i.imgur.com/FYoQoiG.jpg'
          alt='Foto de Franco Espinoza'
        />
      </div>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
