export function saveGameStorage({ newBoard, newTurn }) {
  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)
}

export function resetGameStorage() {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
