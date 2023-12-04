import { useContext } from 'react'
import { ProductsContex } from '../context/products'

export function useProducts() {
  const products = useContext(ProductsContex)
  if (products === undefined) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider')
  }
  return products
}
