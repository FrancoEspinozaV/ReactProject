import { useState } from 'react'
import { FiltersTodo } from '../types'
import { TODO_FILTERS } from '../const'
import { useTodoContext } from '../contex/TodoContext'

export function useFilters() {
  // ¿Es necesario utilizar reducer aquí?
  const { todos } = useTodoContext()
  const [filterSelected, setFilterSelected] = useState<FiltersTodo>(
    TODO_FILTERS.ALL
  )

  const filteredTodo = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const handleFilterChange = (filter: FiltersTodo) => {
    setFilterSelected(filter)
  }

  return {
    activeCount,
    completedCount,
    filterSelected,
    filteredTodo,
    handleFilterChange,
  }
}
