import { useState } from 'react'
import { Todos } from './Components/Todos'
import { FiltersTodo, TodoCompleted, TodoTitle, type TodoId } from './types.d'
import { TODO_FILTERS } from './const'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
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
  const [filterSelected, setFilterSelected] = useState<FiltersTodo>(
    TODO_FILTERS.ALL
  )

  const handleRemove = (id: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FiltersTodo) => {
    setFilterSelected(filter)
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

  const handleRemoveCompleted = () => {
    const newTodo = todos.filter((todo) => !todo.completed)
    setTodos(newTodo)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodo = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = (title: TodoTitle) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />

      {todos.length !== 0 ? (
        <Todos
          removeTodo={handleRemove}
          completedTodo={handleCompleted}
          todos={filteredTodo}
        />
      ) : (
        <strong>No tiene tareas agrega una :D </strong>
      )}

      <Footer
        filterSelected={filterSelected}
        activCound={activeCount}
        completedCount={completedCount}
        onClearCompleted={handleRemoveCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
