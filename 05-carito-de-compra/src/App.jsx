import { Products } from './component/Products'
import { Home } from './component/Home'
import { useFilter } from './hooks/useFilter'
import { useProductsContext } from './context/products'

function App() {
  const { products } = useProductsContext()
  const { filterProducts } = useFilter()

  return (
    <>
      <Home />
      <Products products={filterProducts(products)} />
    </>
  )
}

export default App
