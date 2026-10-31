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

  const handleCopy = () => {
    navigator.clipboard.writeText('0028881024504612')
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
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* 背景黑色遮罩 */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowCheckout(false)
              closeCart()
            }}
          />

          {/* 購物車主體 */}
          <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-cream text-ink shadow-2xl">
            {/* 標題欄 */}
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
                className="p-2 text-ink hover:opacity-70"
              >
                <X className="size-6" />
              </button>
            </div>

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
            ) : showCheckout ? (
              /* === 點擊 CHECKOUT 後直接在抽屜顯示匯款帳號 === */
              <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6">
                <div className="space-y-6">
                  <div className="border-b border-border pb-4">
                    <span className="text-xs tracking-[0.2em] text-muted-foreground">PAYMENT METHOD</span>
                    <h3 className="text-xl font-bold">ATM 銀行轉帳</h3>
                  </div>

                  <div className="space-y-4 rounded-lg border border-border bg-black/5 p-5 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">應付金額</span>
                      <span className="text-lg font-bold text-burgundy">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">銀行代碼</span>
                      <span className="font-bold">台新國際商業銀行 (812)</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-1">匯款帳號</span>
                      <div className="flex items-center justify-between rounded bg-white p-3 border border-border">
                        <span className="text-base font-bold tracking-wider">0028881024504612</span>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="flex items-center gap-1 rounded bg-ink px-3 py-1.5 text-xs text-cream hover:bg-burgundy"
                        >
                          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                          {copied ? '已複製' : '複製'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-l-2 border-burgundy pl-4 text-xs leading-relaxed text-muted-foreground font-serif-tc">
                    <p className="font-bold text-ink text-sm">✦ 匯款後出貨流程：</p>
                    <p>1. 轉帳完成後，請將「本頁購物明細截圖」與「匯款帳號末 5 碼」私訊官方 IG。</p>
                    <p>2. 同時留下收件人姓名、電話及 7-11 / 全家 門市名稱。</p>
                    <p>3. 對帳完成後將立即排單出貨！</p>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-full border border-ink py-3 text-xs tracking-[0.2em] hover:bg-ink hover:text-cream transition-colors"
                  >
                    ← 返回修改購物袋
                  </button>
                </div>
              </div>
            ) : (
              /* === 購物袋商品清單 === */
              <>
                <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-4 py-5">
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
                        <p className="mt-1 text-xs text-muted-foreground">
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
                            className="text-xs text-muted-foreground hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border px-6 py-6">
                  <p className="mb-4 text-xs text-muted-foreground">
                    {remaining > 0
                      ? `Spend ${formatPrice(remaining)} more for free shipping in Taiwan.`
                      : 'You unlocked free shipping in Taiwan.'}
                  </p>
                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="text-xs font-medium tracking-[0.2em]">SUBTOTAL</span>
                    <span className="font-display text-2xl font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {/* CHECKOUT 按鈕 */}
                  <button
                    type="button"
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-ink py-4 text-xs font-medium tracking-[0.25em] text-cream transition-colors duration-300 hover:bg-burgundy"
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
