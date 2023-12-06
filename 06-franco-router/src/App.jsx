import { useEffect, useState } from 'react'
import { STATE } from './constantes'
import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'

function App() {
  const [curretPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(STATE.PUSH_STATE, onLocationChange)
    window.addEventListener(STATE.POP_STATE, onLocationChange)

    return () => {
      window.removeEventListener(STATE.PUSH_STATE, onLocationChange)
      window.removeEventListener(STATE.POP_STATE, onLocationChange)
    }
  }, [])

  return (
    <main>
      {curretPath === '/' && <HomePage />}
      {curretPath === '/about' && <AboutPage />}
    </main>
  )
}

export default App
