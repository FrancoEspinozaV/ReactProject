import { STATE_CART } from '../constantes'

export const initState = JSON.parse(window.localStorage.getItem('cart')) || []

function updateLocalStorage(state) {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export function reducer(state, action) {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case STATE_CART.ADD_CART: {
      const { id } = actionPayload
      const idProductInCart = state.findIndex((item) => item.id === id)
      if (idProductInCart >= 0) {
        const newState = structuredClone(state)
        newState[idProductInCart].quantity += 1
        updateLocalStorage(newState)
        return newState
      }
      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ]

      updateLocalStorage(newState)
      return newState
    }

    case STATE_CART.REMOVE_CART: {
      const { id } = actionPayload
      const idProductInCart = state.findIndex((item) => item.id === id)

      if (idProductInCart >= 0 && actionPayload.quantity >= 2) {
        const newState = structuredClone(state)
        newState[idProductInCart].quantity -= 1
        updateLocalStorage(newState)
        return newState
      }
      const newCart = structuredClone(state)
      newCart.splice(idProductInCart, 1)
      updateLocalStorage(newCart)
      return newCart
    }

    case STATE_CART.CLEAR_CART: {
      window.localStorage.removeItem('cart')
      return []
    }
  }
}
