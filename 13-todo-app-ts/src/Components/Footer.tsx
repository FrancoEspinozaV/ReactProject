import { useFilterContext } from '../contex/FilterContext'
import { useTodos } from '../hooks/useTodos'
import { Filters } from './Filters'

export function Footer() {
  const { removeCompleted } = useTodos()
  const { activeCount, completedCount } = useFilterContext()
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activeCount}</strong> tareas pendientes
      </span>

      <Filters />
      {completedCount > 0 && (
        <button className='clear-completed' onClick={removeCompleted}>
          borrar completadas
        </button>
      )}
    </footer>
  )
}
