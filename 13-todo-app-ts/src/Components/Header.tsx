import { type TodoTitle } from '../types.d'
import { CreateTodo } from './CreateTodo'

interface Props {
  onAddTodo: (title: TodoTitle) => void
}
export function Header({ onAddTodo }: Props) {
  return (
    <header>
      <h1>Lista 😀</h1>
      <CreateTodo saveTodo={onAddTodo} />
    </header>
  )
}
