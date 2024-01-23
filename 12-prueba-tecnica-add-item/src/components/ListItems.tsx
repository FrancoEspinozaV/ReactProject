import { IdItems, Items } from '../type'

interface Props {
  items: Items[]
  deleteItem: (item: IdItems) => void
}

export function ListItems({ items, deleteItem }: Props) {
  return (
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
                onClick={() => deleteItem(item.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
