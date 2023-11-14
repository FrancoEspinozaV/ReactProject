import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constant'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './component/WinnerModal'
import { Tablero } from './component/Tablero'
import { Turnos } from './component/Turnos'
import { resetGameStorage, saveGameStorage } from './logic/storage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameStorage({ newBoard, newTurn })

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
    resetGameStorage()
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
