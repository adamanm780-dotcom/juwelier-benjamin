'use client'

import {
  createContext, useContext, useReducer, useCallback,
  type ReactNode,
} from 'react'
import { type Product } from '@/data/products'

// ─── Typen ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product:  Product
  quantity: number
}

interface CartState {
  items:  CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM';        product: Product }
  | { type: 'REMOVE_ITEM';     id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'OPEN_CART'  }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' }

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.product.id === action.product.id)
      const items = exists
        ? state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { product: action.product, quantity: 1 }]
      return { ...state, items, isOpen: true }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.product.id !== action.id),
      }

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.product.id !== action.id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      }
    }

    case 'OPEN_CART':  return { ...state, isOpen: true }
    case 'CLOSE_CART': return { ...state, isOpen: false }
    case 'CLEAR_CART': return { ...state, items: [] }

    default: return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  items:          CartItem[]
  isOpen:         boolean
  totalItems:     number
  subtotal:       number
  addToCart:      (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  openCart:       () => void
  closeCart:      () => void
  clearCart:      () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  const addToCart      = useCallback((product: Product) => dispatch({ type: 'ADD_ITEM', product }), [])
  const removeFromCart = useCallback((id: string) => dispatch({ type: 'REMOVE_ITEM', id }), [])
  const updateQuantity = useCallback((id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity }), [])
  const openCart       = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart      = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])
  const clearCart      = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])

  const totalItems = state.items.reduce((n, i) => n + i.quantity, 0)
  const subtotal   = state.items.reduce((n, i) => n + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items, isOpen: state.isOpen,
      totalItems, subtotal,
      addToCart, removeFromCart, updateQuantity,
      openCart, closeCart, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
