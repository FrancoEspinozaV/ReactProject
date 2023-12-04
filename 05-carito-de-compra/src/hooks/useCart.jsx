import { useContext } from 'react'
import { CartContext } from '../context/cart'

export function useCart() {
  const cart = useContext(CartContext)

  if (cart === undefined) {
    throw new Error('useCart debe ir dentro de un CartProvider')
  }

  return cart
}
