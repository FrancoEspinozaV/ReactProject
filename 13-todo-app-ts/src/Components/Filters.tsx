import { type FiltersTodo } from '../types.d'
import { FILTERS_BUTTONS } from '../const'

interface Props {
  filterSelected: FiltersTodo
  onFilterChange: (filter: FiltersTodo) => void
}

export function Filters({ filterSelected, onFilterChange }: Props) {
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
                onFilterChange(key as FiltersTodo)
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
