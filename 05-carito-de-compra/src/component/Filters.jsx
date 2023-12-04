import { useId } from 'react'
import '../style/filters.css'
import { useFilter } from '../hooks/useFilter'
import { useProducts } from '../hooks/useProduct'

export function Filters() {
  const { filters, setFilters } = useFilter()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()
  const { products } = useProducts()

  const categories = [
    'all',
    ...new Set(products.map((product) => product.category)),
  ]

  const handleChangePrice = (event) => {
    const currentPrice = event.target.value
    setFilters((prevState) => ({
      ...prevState,
      minPrice: currentPrice,
    }))
  }

  const handleChangeCategory = (event) => {
    const currentCategory = event.target.value
    setFilters((prevState) => ({
      ...prevState,
      category: currentCategory,
    }))
  }
  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Precio minimo</label>
        <input
          onChange={handleChangePrice}
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Categoria</label>
        <select
          onChange={handleChangeCategory}
          name={categoryFilterId}
          id={categoryFilterId}
        >
          {categories.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
