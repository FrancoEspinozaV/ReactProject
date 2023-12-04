import { Products } from './component/Products'
import { Home } from './component/Home'
import { useFilter } from './hooks/useFilter'
import { Cart } from './component/Cart'
import { useProducts } from './hooks/useProduct'
import { CartProvider } from './context/cart'
function App() {
  const { products } = useProducts()
  const { filterProducts } = useFilter()

  return (
    <CartProvider>
      <Home />
      <Cart />
      <Products products={filterProducts(products)} />
    </CartProvider>
  )
}

export default App
