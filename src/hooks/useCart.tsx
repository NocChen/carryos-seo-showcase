'use client'

import { createContext, useContext, useReducer, useCallback } from 'react'
import { CartItem, Product, CheckoutStep } from '@/lib/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  checkoutStep: CheckoutStep | null
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'SET_CHECKOUT_STEP'; payload: CheckoutStep | null }
  | { type: 'CLEAR_CART' }

const FREE_SHIPPING_THRESHOLD = 75

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          isOpen: true,
        }
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
        isOpen: true,
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.payload),
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.id
            ? { ...i, quantity: Math.max(0, action.payload.quantity) }
            : i
        ).filter((i) => i.quantity > 0),
      }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false, checkoutStep: null }
    case 'SET_CHECKOUT_STEP':
      return { ...state, checkoutStep: action.payload }
    case 'CLEAR_CART':
      return { ...state, items: [], checkoutStep: null }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  checkoutStep: CheckoutStep | null
  itemCount: number
  subtotal: number
  shipping: number
  total: number
  freeShippingRemaining: number
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  setCheckoutStep: (step: CheckoutStep | null) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    checkoutStep: null,
  })

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 8
  const total = subtotal + shipping
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  const addItem = useCallback((product: Product) => dispatch({ type: 'ADD_ITEM', payload: product }), [])
  const removeItem = useCallback((id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id }), [])
  const updateQuantity = useCallback((id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])
  const setCheckoutStep = useCallback((step: CheckoutStep | null) => dispatch({ type: 'SET_CHECKOUT_STEP', payload: step }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        checkoutStep: state.checkoutStep,
        itemCount,
        subtotal,
        shipping,
        total,
        freeShippingRemaining,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        openCart,
        closeCart,
        setCheckoutStep,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
