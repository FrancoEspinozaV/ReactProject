import './App.css'
import { AddItems } from './components/AddItems'
import { ListItems } from './components/ListItems'
import { useCEO } from './hooks/useCEO'
import { useItems } from './hooks/useItems'

function App() {
  const { items, deleteItem, addItem } = useItems()
  useCEO({
    title: `[${items.length}] Prueba Técnica de React`,
    description: 'Añadir y eliminar elementos de una lista',
  })
  return (
    <main>
      <AddItems addItem={addItem} />
      <ListItems items={items} deleteItem={deleteItem} />
    </main>
  )
}

export default App
