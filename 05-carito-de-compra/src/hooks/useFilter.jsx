import { useContext } from 'react'
import { FilterContext } from '../context/filters'

export function useFilter() {
  const filtersContext = useContext(FilterContext)
  if (filtersContext === undefined) {
    throw new Error('useFilter debe de usado dentro de un FilterProvider')
  }

  const { filters, setFilters } = filtersContext

  const filterProducts = (products) => {
    return products.filter(
      (product) =>
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
    )
  }

  return { filters, setFilters, filterProducts }
}
