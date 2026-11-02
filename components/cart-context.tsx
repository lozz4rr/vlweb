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
  addItem: (product: Product, sizeOrColor: string, colorOrSize?: string) => void
  updateQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const MAX_QUANTITY = 10

// 顏色固定規則
function resolveColor(product: Product, inputColor?: string): string {
  const checkStr = `${product.id} ${product.name}`.toLowerCase()
  if (checkStr.includes('vulung') || checkStr.includes('百步蛇')) return 'Black 黑'
  if (checkStr.includes('kadjiadji') || checkStr.includes('蝴蝶')) return 'White 白'
  return inputColor || product.colors[0]?.name || 'Standard'
}

// 尺寸判斷：檢查是否為標準尺寸
function resolveSize(arg1: string, arg2?: string): string {
  const validSizes = ['S', 'M', 'L', 'XL', '2XL']
  if (validSizes.includes(arg1?.trim().toUpperCase())) return arg1.trim().toUpperCase()
  if (arg2 && validSizes.includes(arg2.trim().toUpperCase())) return arg2.trim().toUpperCase()
  return arg1 || 'M'
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null)

  const addItem = useCallback((product: Product, param1: string, param2?: string) => {
    // 自動識別哪個參數是尺寸、哪個是顏色，徹底杜絕參數順序相反的錯誤
    const size = resolveSize(param1, param2)
    const color = resolveColor(product, param2?.includes('黑') || param2?.includes('白') ? param2 : param1)

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
