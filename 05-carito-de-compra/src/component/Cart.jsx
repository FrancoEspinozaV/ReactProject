import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'
import '../style/cart.css'
import { useCart } from '../hooks/useCart'

export function Cart() {
  const cartId = useId()
  const { cart, addtocart, clearCart, removeToCart } = useCart() // es un arreglo ponerlo en el map
  return (
    <>
      <label className=' cart-button' htmlFor={cartId}>
        <CartIcon />
      </label>
      <input type='checkbox' id={cartId} hidden />
      <aside className='cart'>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />

              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>

              <footer>
                <button onClick={() => removeToCart(product)}>-</button>
                <small>Cantidad: {product.quantity}</small>
                <button onClick={() => addtocart(product)}>+</button>
              </footer>
            </li>
          ))}
        </ul>
        <button onClick={() => clearCart()}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
