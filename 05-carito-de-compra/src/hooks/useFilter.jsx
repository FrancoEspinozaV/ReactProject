import { useFilterContext } from '../context/filters'

export function useFilter() {
  const { filters, setFilters } = useFilterContext()

  const filterProducts = (products) => {
    return products.filter(
      (product) =>
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
    )
  }

  return { filters, setFilters, filterProducts }
}
