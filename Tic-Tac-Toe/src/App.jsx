import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constant'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './component/WinnerModal'
import { Tablero } from './component/Tablero'
import { Turnos } from './component/Turnos'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar Juego</button>
      <Tablero updateBoard={updateBoard} board={board} />
      <Turnos turn={turn} />
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
