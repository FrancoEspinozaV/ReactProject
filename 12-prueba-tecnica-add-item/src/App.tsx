import { useState } from 'react'
import './App.css'

type IdItems = `${string}-${string}-${string}-${string}-${string}`

interface Items {
  id: IdItems
  text: string
}

const INITIAL_STATE = [
  {
    id: crypto.randomUUID(),
    text: 'Videojuego 🎮',
  },
  {
    id: crypto.randomUUID(),
    text: 'Libros 📚',
  },
]

function App() {
  const [items, setItems] = useState<Items[]>(INITIAL_STATE)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const elemento = data.get('elemento')?.toString() || ''

    const newItem: Items = {
      id: crypto.randomUUID(),
      text: elemento,
    }
    setItems([...items, newItem])
    form.reset()
  }

  const handleDelete = (id: IdItems) => {
    const newElements = items.filter((item) => item.id !== id)
    setItems(newElements)
  }

  return (
    <main>
      <aside>
        <h1>Prueba Técnica</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>
        <form onSubmit={handleSubmit}>
          <label>
            introducir elemento:
            <input
              style={{ marginLeft: '10px' }}
              name='elemento'
              required
              placeholder='Videojuego 🎮'
              type='text'
            />
          </label>
          <div>
            <button>añadir elemento</button>
          </div>
        </form>
      </aside>
      <section>
        <h2>Lista de elemento</h2>
        {items.length === 0 ? (
          <strong>no existen elementos</strong>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.text}
                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
