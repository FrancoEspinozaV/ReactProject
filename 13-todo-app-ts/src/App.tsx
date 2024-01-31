import { useState } from 'react'
import { Todos } from './Components/Todos'
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

  const handleRemove = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Todos removeTodo={handleRemove} todos={todos} />
    </div>
  )
}

export default App
