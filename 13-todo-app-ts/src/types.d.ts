import { TODO_FILTERS } from './const'

export type TodoId = string
export type TodoTitle = string
export type TodoCompleted = boolean

export interface Todo {
  id?: TodoId
  title?: TodoTitle
  completed?: TodoCompleted
}

export type ListOfTodo = Todo[]

export type FiltersTodo = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS]
