
import { useRef, useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import { generarDatosAlAzarConPesos, generarFakeMoves } from './logic/random'
import { SquareType } from './types'
import { awards, numerosSquare } from './constantes'
import { Modal } from './components/Modal'

interface PropsAnimation {
  movimientosSimulados: SquareType[]
  ganadorReal: SquareType
}

interface dataWinner {
  id: string;
  name: string;
  winningNumber: number;
  phone: string;
  email: string;
}

function App () {
  const [listAwards, setListAwards] = useState(awards)
  const [numbersSuare/*, setNumbersSqueare*/] = useState(numerosSquare)
  const movimientosSimulados = generarFakeMoves({ elementos: numbersSuare })
  const [winners, setWinners] = useState<SquareType[] | []>([])
  const ganador = generarDatosAlAzarConPesos({ elementos: numbersSuare })
  const [objectPath, setObjetPath] = useState<SquareType>()
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState<SquareType>(ganador)
  const [inGame, setInGame] = useState(false)

  const ganadorActualRef = useRef<SquareType>(ganador);

  const updateListAwards = (winnerData: dataWinner) => {
    const indexWinner = listAwards.findIndex(award => award.winner.id === '')
    if (indexWinner === -1) return

    setListAwards((prevList) => {
      const newListAward = [...prevList]
      newListAward[indexWinner].winner = winnerData
      return newListAward
    })

  }


  // Función para simular la animación
  const simularAnimacion = ({
    movimientosSimulados,
    ganadorReal,
  }: PropsAnimation) => {
    setInGame(true);
    const duracionMovimiento = 1000;

    movimientosSimulados.forEach((movimiento, index) => {
      setTimeout(() => {
        setObjetPath(movimiento);
        if (index === movimientosSimulados.length - 1) {
          const dataWinner = {
            id: ganadorReal.id,
            name: ganadorReal.userData.name,
            winningNumber: ganadorReal.placeholder,
            phone: ganadorReal.userData.phone,
            email: ganadorReal.userData.email,
          }
          updateListAwards(dataWinner)
          setObjetPath(ganadorReal);
          setOpen(true);
          setInGame(false);
          setWinners([...winners, ganadorReal]);

        }
      }, index * duracionMovimiento);

      if (index === movimientosSimulados.length - 1) {
        setTimeout(() => {
          setWinner(ganadorActualRef.current);
        }, (index + 1) * duracionMovimiento);
      }
    });

    ganadorActualRef.current = ganadorReal;
  };

  const handleSeletedPath = () => {
    simularAnimacion({ movimientosSimulados: movimientosSimulados, ganadorReal: ganador })
  }

  return (
    <main className='dark:bg-zinc-900 bg-white w-full h-full dark:text-white text-black p-10 flex gap-5'>
      <section className='w-full'>
        <div className='mt-14 border-2 border-white rounded-2xl'>
          <span>Premios</span>
          <ul className='flex flex-col gap-2 p-5'>
            {listAwards.map((award) => {

              return (
                <li className='flex gap-5 items-center'>
                  <div className='flex gap-2 items-start w-full justify-between '>
                    <div className='flex gap-2'>
                      <img className='h-20 w-20 rounded-xl' src={award.urlImg} alt={`product imgage ${award.nameAwards}`} />
                      <div className='flex flex-col items-start'>
                        <span className='text-pink-200 text-lg '>
                          {award.nameAwards}
                        </span>
                        <a target='_blank' className='text-blue-400' href={award.urlInfoAwards}>info</a>
                      </div>
                    </div>
                    {
                      award.winner.id !== '' && (
                        <>
                          <div className=' items-end'>
                            Ganador: {award.winner.name}
                          </div>
                        </>
                      )
                    }
                  </div>

                </li>
              )
            })}

          </ul>
        </div>
      </section>
      <section className='w-full flex flex-col items-center'>
        <section className='w-full max-w-xs'>
          <button disabled={inGame} className={`w-full border-2 border-white py-2 px-5 rounded-2xl ${inGame ? 'opacity-50' : ''}`} onClick={handleSeletedPath}>Empezar!</button>
        </section>
        <section className='pt-4 w-full max-w-2xl'>
          <Square numbersSuare={numbersSuare} objectPath={objectPath} />
        </section>
      </section>
      <section className='w-full'>
        <div className='mt-14 border-2 border-white rounded-2xl'>
          Ganadores
          <ul className='p-4 flex flex-col justify-start items-start'>
            {winners.map((winner) => {
              return (
                <li key={winner.id}>
                  {winner.userData.name}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      {open && <>
        <Modal open={open} setOpen={setOpen} userWin={winner} />
      </>}
    </main>
  )
}

export default App
