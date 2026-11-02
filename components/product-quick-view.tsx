'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatPrice, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

interface ProductQuickViewProps {
  product: Product | null
  onClose: () => void
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[1] ?? product.sizes[0] ?? 'M')
      setActiveSide('front')
      setAdded(false)
    }
  }, [product])

  useEffect(() => {
    if (!product) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  // 固定採用預設顏色名稱以順暢寫入購物車
  const defaultColorName = product.colors[0]?.name ?? 'Standard'
  const currentImage = product.images[activeSide] || product.images.front

  const handleAddToCart = () => {
    addItem(product, defaultColorName, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-none bg-cream text-ink shadow-2xl md:flex-row"
        >
          {/* 關閉按鈕 */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-cream/80 text-ink backdrop-blur-sm transition-opacity hover:opacity-70"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>

          {/* 圖片預覽區 */}
          <div className="relative aspect-square w-full shrink-0 bg-secondary md:w-1/2">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-opacity duration-300"
              priority
            />
            {product.images.back && product.images.back !== product.images.front && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSide('front')}
                  className={cn(
                    'px-3 py-1 text-[11px] font-medium tracking-widest transition-colors',
                    activeSide === 'front' ? 'bg-ink text-cream' : 'bg-cream/80 text-ink hover:bg-cream',
                  )}
                >
                  FRONT
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSide('back')}
                  className={cn(
                    'px-3 py-1 text-[11px] font-medium tracking-widest transition-colors',
                    activeSide === 'back' ? 'bg-ink text-cream' : 'bg-cream/80 text-ink hover:bg-cream',
                  )}
                >
                  BACK
                </button>
              </div>
            )}
          </div>

          {/* 內容設定區 */}
          <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
            {/* 標題：採用 font-serif-tc 並加強為 font-bold */}
            <h2 className="mt-1 font-serif font-serif-tc text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {product.name}
            </h2>
            <p className="mt-1 font-serif-tc text-xs text-muted-foreground">{product.subtitle}</p>

            {/* 價格區塊：套用淡粉褐底＋深紅字預購折扣徽章 */}
            <div className="mt-4 flex items-baseline gap-3 border-b border-border/60 pb-5">
              <span className="font-display text-3xl font-bold text-ink">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-display text-base text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="rounded bg-[#e8d3cb] px-2.5 py-0.5 font-sans text-xs font-medium tracking-wider text-[#7a3528]">
                預購折扣
              </span>
            </div>

            {/* 說明文案：思源宋體 */}
            <div className="py-5 font-serif-tc text-[15px] leading-relaxed text-ink/85 whitespace-pre-line">
              {product.description}
            </div>

            {/* COLOR 衣服顏色已完全移除 */}

            {/* 尺寸選項 */}
            <div className="border-t border-border/60 py-4">
              <div className="flex items-center justify-between text-xs tracking-[0.2em]">
                <span className="font-medium">SIZE 尺寸</span>
                <span className="text-muted-foreground">{selectedSize}</span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const active = size === selectedSize
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'border py-2 text-xs font-medium tracking-widest transition-colors',
                        active
                          ? 'border-ink bg-ink text-cream'
                          : 'border-border bg-transparent hover:border-ink',
                      )}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 加到購物車按鈕 */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={added}
              className={cn(
                'mt-6 w-full py-4 text-xs font-medium tracking-[0.25em] text-cream transition-all duration-300',
                added ? 'bg-burgundy' : 'bg-ink hover:bg-burgundy active:scale-[0.99]',
              )}
            >
              {added ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="size-4" /> ADDED TO BAG
                </span>
              ) : (
                `ADD TO CART — ${formatPrice(product.price)}`
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
