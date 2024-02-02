import { type FiltersTodo } from '../types.d'
import { Filters } from './Filters'

interface Props {
  activCound: number
  completedCount: number
  filterSelected: FiltersTodo
  handleFilterChange: (filter: FiltersTodo) => void
  onClearCompleted: () => void
}
export function Footer({
  activCound = 0,
  completedCount = 0,
  filterSelected,
  onClearCompleted,
  handleFilterChange,
}: Props) {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activCound}</strong> tareas pendientes
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      {completedCount > 0 && (
        <button className='clear-completed' onClick={onClearCompleted}>
          borrar completadas
        </button>
      )}
    </footer>
  )
}
