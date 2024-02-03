import { useState } from 'react'
import { type Todo as TodoType } from '../types.d'
import { useTodoContext } from '../contex/TodoContext'

export function Todo({ id, title, completed }: TodoType) {
  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const { removeTodo, completedTodo } = useTodoContext()

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    completedTodo(id, event.target.checked)
  }

  const checkDoubleClick = () => {
    setEditing(true)
  }

  const handleInputBlur = () => {
    setEditing(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNewTitle(newTitle)
  }

  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={handleCheck}
      />
      {editing ? ( // TODO: agregar funcionalidad con enter
        <form onSubmit={handleSubmit}>
          <input
            className='new-todo'
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value)
            }}
            onBlur={handleInputBlur}
            placeholder='¿Que quieres haces?'
            autoFocus
          />
        </form>
      ) : (
        <label onDoubleClick={checkDoubleClick}>{newTitle}</label>
      )}
      <button
        className='destroy'
        onClick={() => {
          removeTodo(id)
        }}
      />
    </div>
  )
}
