import { useState } from 'react'
import { type TodoTitle } from '../types.d'

interface Props {
  saveTodo: (title: TodoTitle) => void
}
export function CreateTodo({ saveTodo }: Props) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveTodo(inputValue)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='new-todo'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        placeholder='¿Que quieres haces?'
        autoFocus
      />
    </form>
  )
}
