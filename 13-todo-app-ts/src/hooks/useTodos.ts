import { useReducer } from 'react'
import { Todo, TodoCompleted, TodoId, TodoTitle } from '../types'
import { ACTIONS_TODO } from '../const'
import { initialState, reducer } from '../reducers/todo'

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const removeTodo = (id: TodoId) => {
    dispatch({ type: ACTIONS_TODO.REMOVE, payload: { id } })
  }

  const completedTodo = (id: TodoId, completed: TodoCompleted) => {
    dispatch({
      type: ACTIONS_TODO.COMPLETED,
      payload: { id, completed } as Todo,
    })
  }

  const removeCompleted = () => {
    dispatch({ type: ACTIONS_TODO.REMOVE_COMPLETED, payload: {} })
  }

  const addTodo = (title: TodoTitle) => {
    dispatch({ type: ACTIONS_TODO.ADD, payload: { title } })
  }

  return {
    todos: state,
    removeCompleted,
    removeTodo,
    completedTodo,
    addTodo,
  }
}
