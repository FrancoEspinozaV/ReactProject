import { useFilterContext } from '../contex/FilterContext'
import { Todo } from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export function Todos() {
  const [parent] = useAutoAnimate()
  const { filteredTodo } = useFilterContext()
  return (
    <ul className='todo-list' ref={parent}>
      {filteredTodo.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        </li>
      ))}
    </ul>
  )
}
