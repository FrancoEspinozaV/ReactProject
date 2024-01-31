import { type TodoId, type ListOfTodo, type TodoCompleted } from '../types.d'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodo
  removeTodo: (id: TodoId) => void
  completedTodo: (id: TodoId, completed: TodoCompleted) => void
}

export function Todos({ todos, removeTodo, completedTodo }: Props) {
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
            completedTodo={completedTodo}
          />
        </li>
      ))}
    </ul>
  )
}
