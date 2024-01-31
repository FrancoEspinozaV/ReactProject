import {
  type TodoCompleted,
  type TodoId,
  type Todo as TodoType,
} from '../types.d'

interface Props extends TodoType {
  removeTodo: (id: TodoId) => void
  completedTodo: (id: TodoId, completed: TodoCompleted) => void
}

export function Todo({
  id,
  title,
  completed,
  removeTodo,
  completedTodo,
}: Props) {
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    completedTodo(id, event.target.checked)
  }
  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={handleCheck}
      />
      <label>{title}</label>
      <button
        className='destroy'
        onClick={() => {
          removeTodo(id)
        }}
      />
    </div>
  )
}
