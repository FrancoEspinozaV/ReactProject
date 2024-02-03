import { createContext, useContext } from 'react'
import { useFilters } from '../hooks/useFilters'
import { FiltersTodo, ListOfTodo } from '../types'

interface FilterType {
  filteredTodo: ListOfTodo
  filterSelected: FiltersTodo
  handleFilterChange: (filter: FiltersTodo) => void
}

export const filterContext = createContext<FilterType>({} as FilterType)

export function FilterContextProvider({ children }: { children: JSX.Element }) {
  const { filteredTodo, filterSelected, handleFilterChange } = useFilters()
  return (
    <filterContext.Provider
      value={{ filteredTodo, filterSelected, handleFilterChange }}
    >
      {children}
    </filterContext.Provider>
  )
}

export function useFilterContext() {
  const filters = useContext(filterContext)
  return filters
}
