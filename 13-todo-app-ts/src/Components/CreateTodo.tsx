import { useState } from 'react'
import { useTodoContext } from '../contex/TodoContext'

export function CreateTodo() {
  const { addTodo } = useTodoContext()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(inputValue)
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
