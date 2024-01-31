import { type ListOfTodo } from '../types.d'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodo
  removeTodo: (id: string) => void
}

export function Todos({ todos, removeTodo }: Props) {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            removeTodo={removeTodo}
          />
        </li>
      ))}
    </ul>
  )
}
