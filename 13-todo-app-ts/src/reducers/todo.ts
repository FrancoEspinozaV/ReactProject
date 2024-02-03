import { ACTIONS_TODO } from '../const'
import {
  addTodos,
  completedTodos,
  deleteTodos,
  getTodos,
} from '../services/todoList'
import { ListOfTodo, Todo } from '../types'

interface ActionType {
  type: string
  payload: Todo
}

export const initialState = await getTodos()

export const reducer = (state: ListOfTodo, action: ActionType) => {
  const { type, payload } = action
  if (type === ACTIONS_TODO.REMOVE) {
    const newTodos = state.filter((todo) => todo.id !== payload?.id)
    deleteTodos({ todos: newTodos })
    return newTodos
  }

  if (type === ACTIONS_TODO.COMPLETED) {
    const newTodos = state.map((todo) => {
      if (todo.id === payload?.id)
        return {
          ...todo,
          completed: payload?.completed,
        }
      return todo
    })
    completedTodos({ todos: newTodos })
    return newTodos
  }

  if (type === ACTIONS_TODO.REMOVE_COMPLETED) {
    const newTodos = state.filter((todo) => !todo.completed)
    deleteTodos({ todos: newTodos })
    return newTodos
  }

  if (type === ACTIONS_TODO.ADD) {
    const newTodo = {
      title: payload?.title,
      id: crypto.randomUUID(),
      completed: false,
    }

    const newTodos = [...state, newTodo]
    addTodos({ todos: newTodos })
    return newTodos
  }

  return state
}
