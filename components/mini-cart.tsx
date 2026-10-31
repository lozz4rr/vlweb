'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatPrice } from '@/lib/products'

const SHIPPING_FEE = 50 // 超商運費 50 元
const FREE_SHIPPING_THRESHOLD = 2000

export function MiniCart() {
  const { items, isOpen, closeCart, subtotal, count, lastAddedKey, updateQuantity, removeItem } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)
  const currentShipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const finalTotal = subtotal + currentShipping

    // 點擊結帳：將購物車品項與金額打包傳遞至 Tally 表單
    // 點擊結帳：將購物車品項與金額打包傳遞至 Tally 表單
  const handleCheckout = () => {
    // 移除所有特殊符號（冒號、括號、分號），只留最單純的文字與空格
    const itemsDescription = items
      .map((item) => `${item.product.name} ${item.color} ${item.size} x${item.quantity}`)
      .join(' / ')

    const totalText = `${finalTotal}元`

    // 手動組裝標準 URI 編碼
    const query = `訂購明細=${encodeURIComponent(itemsDescription)}&應付總金額=${encodeURIComponent(totalText)}`
    const tallyUrl = `https://tally.so/r/o9EMxN?${query}`

    window.open(tallyUrl, '_blank')
  }


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* 背景黑色遮罩 */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeCart} />

          {/* 購物車主體 */}
          <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-cream text-ink shadow-2xl">
            {/* 標題欄 */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-2xl font-bold tracking-wide">
                YOUR BAG <span className="text-muted-foreground">({count})</span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="flex size-9 items-center justify-center p-2 text-ink hover:opacity-70"
                aria-label="Close bag"
              >
                <X className="size-6" />
              </button>
            </div>

            <AnimatePresence>
              {lastAddedKey && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-2 overflow-hidden bg-burgundy px-6 text-sm text-cream"
                  role="status"
                >
                  <span className="flex items-center gap-2 py-3">
                    <Check className="size-4" aria-hidden />
                    Added to your bag
                    <span className="font-serif-tc text-cream/70">已加入購物袋</span>
                  </span>
                </motion.p>
              )}
            </AnimatePresence>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-serif text-2xl italic">Your bag is empty.</p>
                <p className="font-serif-tc text-sm text-muted-foreground">購物袋目前是空的</p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-4 border border-ink px-8 py-3 text-xs font-medium tracking-[0.2em] transition-colors hover:bg-ink hover:text-cream"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <>
                {/* 購物清單 */}
                <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
                  {items.map((item) => (
                    <motion.li
                      layout
                      key={item.key}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="flex gap-4 py-5"
                    >
                      <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-secondary">
                        <Image
                          src={item.product.images.front || '/placeholder.svg'}
                          alt={item.product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-lg font-bold leading-tight">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">{item.product.subtitle}</p>
                          </div>
                          <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                        <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                          印色 {item.color} / {item.size}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-border">
                            <button
                              type="button"
                              className="flex size-8 items-center justify-center"
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              className="flex size-8 items-center justify-center"
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* 底部金額計算與 CHECKOUT 按鈕 */}
                <div className="border-t border-border px-6 py-6">
                  <div className="mb-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>商品小計 (Subtotal)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>超商運費 (7-11 / 全家)</span>
                      <span>{currentShipping === 0 ? '免運' : formatPrice(currentShipping)}</span>
                    </div>
                    {remaining > 0 ? (
                      <p className="pt-1 text-[11px] text-muted-foreground">
                        再消費 {formatPrice(remaining)} 即可享免運優惠。
                      </p>
                    ) : (
                      <p className="pt-1 text-[11px] text-burgundy">已達成免運優惠！</p>
                    )}
                  </div>

                  <div className="mb-5 flex items-baseline justify-between border-t border-border/60 pt-3">
                    <span className="text-xs font-medium tracking-[0.2em]">TOTAL</span>
                    <span className="font-display text-2xl font-bold">{formatPrice(finalTotal)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full bg-ink py-4 text-xs font-medium tracking-[0.25em] text-cream transition-colors duration-300 hover:bg-burgundy active:scale-[0.99]"
                  >
                    CHECKOUT →
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full py-2 text-xs tracking-[0.2em] text-muted-foreground hover:text-ink"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
