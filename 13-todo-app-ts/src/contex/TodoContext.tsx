import { createContext, useContext } from 'react'
import { useTodos } from '../hooks/useTodos'
import { ListOfTodo, TodoCompleted, TodoId, TodoTitle } from '../types'

interface TodoContextType {
  todos: ListOfTodo
  activeCount: number
  completedCount: number
  removeCompleted: () => void
  removeTodo: (id: TodoId) => void
  completedTodo: (id: TodoId, completed: TodoCompleted) => void
  addTodo: (title: TodoTitle) => void
}

export const TodoContext = createContext<TodoContextType>({} as TodoContextType)

export function TodoProvider({ children }: { children: JSX.Element }) {
  const {
    todos,
    activeCount,
    completedCount,
    removeCompleted,
    removeTodo,
    completedTodo,
    addTodo,
  } = useTodos()
  return (
    <TodoContext.Provider
      value={{
        todos,
        activeCount,
        completedCount,
        removeCompleted,
        removeTodo,
        completedTodo,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export function useTodoContext() {
  const todo = useContext(TodoContext)

  return todo
}
