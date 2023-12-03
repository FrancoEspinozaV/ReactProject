import { createContext, useContext, useState } from 'react'

export const FilterContext = createContext()

export function useFilterContext() {
  const filters = useContext(FilterContext)
  return filters
}

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 100,
  })
  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
