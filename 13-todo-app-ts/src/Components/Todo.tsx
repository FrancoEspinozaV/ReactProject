import { type Todo as TodoType } from '../types.d'

interface Props extends TodoType {
  removeTodo: (id: string) => void
}

export function Todo({ id, title, completed, removeTodo }: Props) {
  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={() => {}}
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
