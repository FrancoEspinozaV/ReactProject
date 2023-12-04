import { createContext, useState } from 'react'
import { products as initialProducts } from '../mocks/products.json'

export const ProductsContex = createContext()

export function ProductProvider({ children }) {
  const [products] = useState(initialProducts)
  return (
    <ProductsContex.Provider value={{ products }}>
      {children}
    </ProductsContex.Provider>
  )
}
