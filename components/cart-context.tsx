'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { Product } from '@/lib/products'

export type CartItem = {
  key: string
  product: Product
  size: string
  color: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  lastAddedKey: string | null
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size: string, color: string) => void
  updateQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const MAX_QUANTITY = 10

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null)

  const addItem = useCallback((product: Product, size: string, color: string) => {
    const key = `${product.id}-${size}-${color}`
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) } : item,
        )
      }
      return [...prev, { key, product, size, color, quantity: 1 }]
    })
    setLastAddedKey(key)
    setIsOpen(true)
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) } : item)),
    )
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key))
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
      isOpen,
      lastAddedKey,
      openCart: () => {
        setLastAddedKey(null)
        setIsOpen(true)
      },
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
    }),
    [items, isOpen, lastAddedKey, addItem, updateQuantity, removeItem],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
