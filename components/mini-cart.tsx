'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatPrice } from '@/lib/products'

const FREE_SHIPPING_THRESHOLD = 2000

export function MiniCart() {
  const { items, isOpen, closeCart, subtotal, count, lastAddedKey, updateQuantity, removeItem } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [copied, setCopied] = useState(false)

  const BANK_INFO = {
    bankName: '台新國際商業銀行 (812)',
    accountNumber: '0028881024504612',
  }

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_INFO.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              setShowCheckout(false)
              closeCart()
            }}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream text-ink"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-2xl font-bold tracking-wide">
                YOUR BAG <span className="text-muted-foreground">({count})</span>
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowCheckout(false)
                  closeCart()
                }}
                className="flex size-9 items-center justify-center"
                aria-label="Close bag"
                autoFocus
              >
                <X className="size-5" aria-hidden />
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
                          alt={`${item.product.name} ${item.product.subtitle}`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-lg font-bold leading-tight tracking-wide">
                              {item.product.name}
                            </p>
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
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus className="size-3" aria-hidden />
                            </button>
                            <span className="w-8 text-center text-sm" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="flex size-8 items-center justify-center"
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus className="size-3" aria-hidden />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            className="text-xs tracking-wide text-muted-foreground underline-offset-4 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <div className="border-t border-border px-6 py-6">
                  <p className="mb-4 text-xs tracking-wide text-muted-foreground">
                    {remaining > 0
                      ? `Spend ${formatPrice(remaining)} more for free shipping in Taiwan.`
                      : 'You unlocked free shipping in Taiwan.'}
                  </p>
                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="text-xs font-medium tracking-[0.2em]">SUBTOTAL</span>
                    <span className="font-display text-2xl font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-ink py-4 text-xs font-medium tracking-[0.25em] text-cream transition-colors duration-500 hover:bg-burgundy"
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
          </motion.aside>

          {/* 匯款資訊彈窗 (Modal) */}
          <AnimatePresence>
            {showCheckout && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCheckout(false)}
                  className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative z-10 w-full max-w-md rounded-none border border-border bg-cream p-6 text-ink shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <h3 className="font-display text-xl font-bold tracking-wide">
                      PAYMENT DETAILS <span className="font-serif-tc text-sm font-normal text-muted-foreground">/ 匯款資訊</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      className="text-muted-foreground hover:text-ink"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <div className="my-5 space-y-3 border border-border bg-secondary/30 p-4 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="font-serif-tc text-muted-foreground">應付總額</span>
                      <span className="font-bold text-burgundy">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif-tc text-muted-foreground">銀行名稱</span>
                      <span>{BANK_INFO.bankName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif-tc text-muted-foreground">匯款帳號</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold tracking-wider">{BANK_INFO.accountNumber}</span>
                        <button
                          type="button"
                          onClick={handleCopyAccount}
                          className="rounded border border-border p-1 hover:bg-cream"
                          title="複製帳號"
                        >
                          {copied ? <Check className="size-3 text-burgundy" /> : <Copy className="size-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-l-2 border-burgundy pl-3 text-xs text-muted-foreground font-serif-tc">
                    <p className="font-semibold text-ink">✦ 匯款後回報方式：</p>
                    <p>請將「訂單明細截圖」及「匯款帳號末 5 碼」私訊官方 Instagram 或 Email，核對款項後將立即為您安排出貨。</p>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCheckout(false)
                        closeCart()
                      }}
                      className="w-full bg-ink py-3 text-xs font-medium tracking-[0.2em] text-cream hover:bg-burgundy transition-colors"
                    >
                      我已了解，完成訂購
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
