
import { useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import { generarDatosAlAzarConPesos, generarFakeMoves } from './logic/random'
import { SquareType } from './types'
import { numerosSquare } from './constantes'
import { Modal } from './components/Modal'

interface PropsAnimation {
  movimientosSimulados: SquareType[]
  ganadorReal: SquareType
}

function App () {
  const [numbersSuare/*, setNumbersSqueare*/] = useState(numerosSquare)
  const movimientosSimulados = generarFakeMoves({ elementos: numbersSuare })
  const ganador = generarDatosAlAzarConPesos({ elementos: numbersSuare })
  const [objectPath, setObjetPath] = useState<SquareType>()
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState<SquareType>(ganador)
  const [inGame, setInGame] = useState(false)

  // Función para simular la animación
  const simularAnimacion = ({
    movimientosSimulados,
    ganadorReal,
  }: PropsAnimation) => {
    setInGame(true)
    const duracionMovimiento = 1000 // Duración de cada movimiento en milisegundos

    movimientosSimulados.forEach((movimiento, index) => {
      setTimeout(() => {
        setObjetPath(movimiento)
        console.log(movimiento)
        if (index === movimientosSimulados.length - 1) {
          setObjetPath(ganadorReal)
          setWinner(ganadorReal)
          setOpen(true)
          setInGame(false)
        }
      }, index * duracionMovimiento)
    })
  }

  const handleSeletedPath = () => {
    simularAnimacion({ movimientosSimulados: movimientosSimulados, ganadorReal: ganador })
  }

  return (
    <main className='dark:bg-zinc-900 bg-white w-full h-full dark:text-white text-black p-10 flex flex-col items-center'>
      <section>
        <button disabled={inGame} className={`border-2 border-white py-2 px-5 rounded-2xl ${inGame ? 'opacity-50' : ''}`} onClick={handleSeletedPath}>Empezar!</button>
      </section>
      <section className='pt-4 w-full max-w-2xl'>
        <Square numbersSuare={numbersSuare} objectPath={objectPath} />
      </section>
      {open && <>
        <Modal open={open} setOpen={setOpen} userWin={winner} />
      </>}
    </main>
  )
}

export default App
