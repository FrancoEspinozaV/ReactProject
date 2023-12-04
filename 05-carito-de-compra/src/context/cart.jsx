import { createContext, useReducer } from 'react'
import { initState, reducer } from '../reducer/cart'
import { STATE_CART } from '../constantes'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)
  const addtocart = (product) =>
    dispatch({
      type: STATE_CART.ADD_CART,
      payload: product,
    })

  const removeToCart = (product) =>
    dispatch({
      type: STATE_CART.REMOVE_CART,
      payload: product,
    })

  const clearCart = () =>
    dispatch({
      type: STATE_CART.CLEAR_CART,
    })

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addtocart,
        clearCart,
        removeToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
