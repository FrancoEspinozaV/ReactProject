interface Props {
  addItem: (text: string) => void
}
export function AddItems({ addItem }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const elemento = data.get('elemento')?.toString() || ''
    addItem(elemento)
    form.reset()
  }
  return (
    <aside>
      <h1>Prueba Técnica</h1>
      <h2>Añadir y eliminar elementos de una lista</h2>
      <form onSubmit={handleSubmit} aria-label='añadir elementos a la lista'>
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
  )
}
