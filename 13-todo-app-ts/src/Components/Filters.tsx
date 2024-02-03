import { type FiltersTodo } from '../types.d'
import { FILTERS_BUTTONS } from '../const'
import { useFilterContext } from '../contex/FilterContext'

export function Filters() {
  const { filterSelected, handleFilterChange } = useFilterContext()
  return (
    <ul className='filters'>
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === filterSelected
        const className = isSelected ? 'selected' : ''
        return (
          <li key={key}>
            <a
              className={className}
              href={href}
              onClick={(event) => {
                event.preventDefault()
                handleFilterChange(key as FiltersTodo)
              }}
            >
              {literal}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
