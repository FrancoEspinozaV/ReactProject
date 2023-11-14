import { Square } from './Square'
import { TURNS } from '../constant'
export function Turnos({ turn }) {
  return (
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
  )
}
