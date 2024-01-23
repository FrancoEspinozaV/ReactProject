import { useState } from 'react'
import { IdItems, Items } from '../type'

export function useItems() {
  const [items, setItems] = useState<Items[]>([])

  const addItem = (text: string) => {
    const newItem: Items = {
      id: crypto.randomUUID(),
      text,
    }
    setItems([...items, newItem])
  }

  const deleteItem = (id: IdItems) => {
    const newElements = items.filter((item) => item.id !== id)
    setItems(newElements)
  }

  return {
    items,
    addItem,
    deleteItem,
  }
}
