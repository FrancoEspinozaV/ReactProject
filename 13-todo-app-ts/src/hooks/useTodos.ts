import { useState } from 'react'
import { TodoCompleted, TodoId, TodoTitle } from '../types'

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

export function useTodos() {
  const [todos, setTodos] = useState(MocksTodo)

  const removeTodo = (id: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const completedTodo = (id: TodoId, completed: TodoCompleted) => {
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

  const removeCompleted = () => {
    const newTodo = todos.filter((todo) => !todo.completed)
    setTodos(newTodo)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const addTodo = (title: TodoTitle) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return {
    todos,
    activeCount,
    completedCount,
    removeCompleted,
    removeTodo,
    completedTodo,
    addTodo,
  }
}
