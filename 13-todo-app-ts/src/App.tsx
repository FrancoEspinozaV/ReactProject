import { useState } from 'react'
import { Todos } from './Components/Todos'
import { TodoCompleted, type TodoId } from './types.d'
const MocksTodo = [
  {
    id: '1',
    title: 'Todo 1',
    completed: false,
  },
  {
    id: '2',
    title: 'Todo 2',
    completed: true,
  },
  {
    id: '3',
    title: 'Todo 3',
    completed: false,
  },
]
function App() {
  const [todos, setTodos] = useState(MocksTodo)

  const handleRemove = (id: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = (id: TodoId, completed: TodoCompleted) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id)
        return {
          ...todo,
          completed,
        }
      return todo
    })

    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Todos
        removeTodo={handleRemove}
        completedTodo={handleCompleted}
        todos={todos}
      />
    </div>
  )
}

export default App
