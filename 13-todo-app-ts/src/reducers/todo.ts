import { ACTIONS_TODO } from '../const'
import { ListOfTodo, Todo } from '../types'

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

interface ActionType {
  type: string
  payload: Todo
}

export const initialState = MocksTodo

export const reducer = (state: ListOfTodo, action: ActionType) => {
  const { type, payload } = action
  if (type === ACTIONS_TODO.REMOVE) {
    const newTodos = state.filter((todo) => todo.id !== payload?.id)
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
    return newTodos
  }

  if (type === ACTIONS_TODO.REMOVE_COMPLETED) {
    const newTodo = state.filter((todo) => !todo.completed)
    return newTodo
  }

  if (type === ACTIONS_TODO.ADD) {
    const newTodo = {
      title: payload?.title,
      id: crypto.randomUUID(),
      completed: false,
    }

    const newTodos = [...state, newTodo]
    return newTodos
  }

  return state
}
