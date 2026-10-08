'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatPrice, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

type ProductQuickViewProps = {
  product: Product | null
  onClose: () => void
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  return (
    <AnimatePresence>
      {product && <QuickViewPanel key={product.id} product={product} onClose={onClose} />}
    </AnimatePresence>
  )
}

function QuickViewPanel({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart()
  const [side, setSide] = useState<'front' | 'back'>('back')
  const [size, setSize] = useState<string | null>(null)
  const [color, setColor] = useState(product.colors[0].name)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleAdd = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    addItem(product, size, color)
    onClose()
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-ink/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[92svh] overflow-y-auto bg-cream text-ink md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:w-[min(1040px,92vw)] md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center bg-cream/80"
          aria-label="Close product details"
          autoFocus
        >
          <X className="size-5" aria-hidden />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/5] bg-secondary md:aspect-auto md:min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={side}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[side] || '/placeholder.svg'}
                  alt={`${product.name} ${product.subtitle}, ${side}`}
                  fill
                  sizes="(min-width: 768px) 520px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 flex gap-2" role="group" aria-label="Image side">
              {(['front', 'back'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSide(s)}
                  aria-pressed={side === s}
                  className={cn(
                    'px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] transition-colors',
                    side === s ? 'bg-ink text-cream' : 'bg-cream/90 text-ink',
                  )}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col p-6 md:p-10">
            <p className="text-[11px] tracking-[0.3em] text-muted-foreground">{product.print.toUpperCase()}</p>
            <h2 id="quick-view-title" className="mt-3 font-display text-5xl font-extrabold leading-none tracking-tight">
              {product.name}
            </h2>
            <p className="mt-2 font-serif text-2xl italic">{product.subtitle}</p>
            <p className="mt-1 font-serif-tc text-sm text-muted-foreground">{product.nameZh}</p>
            <p className="mt-5 font-display text-2xl font-semibold">{formatPrice(product.price)}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <fieldset className="mt-8">
              <legend className="mb-3 text-xs font-medium tracking-[0.2em]">
                PRINT COLOR 印色 — <span className="text-muted-foreground">{color}</span>
              </legend>
              <p className="-mt-1 mb-3 font-serif-tc text-xs text-muted-foreground">選擇圖案絹印的顏色，T恤本體為固定色。</p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    aria-pressed={color === c.name}
                    aria-label={c.name}
                    className={cn(
                      'size-9 rounded-full border-2 p-0.5 transition-colors',
                      color === c.name ? 'border-ink' : 'border-transparent',
                    )}
                  >
                    <span className="block size-full rounded-full border border-ink/20" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="mb-3 text-xs font-medium tracking-[0.2em]">
                SIZE — <span className="text-muted-foreground">{product.fit}</span>
              </legend>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s)
                      setSizeError(false)
                    }}
                    aria-pressed={size === s}
                    className={cn(
                      'border py-3 text-sm font-medium transition-colors duration-300',
                      size === s ? 'border-ink bg-ink text-cream' : 'border-border hover:border-ink',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-2 text-xs text-burgundy" role="alert">
                  Please select a size. 請選擇尺寸。
                </p>
              )}
            </fieldset>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-8 w-full bg-ink py-4 text-xs font-medium tracking-[0.25em] text-cream transition-colors duration-500 hover:bg-burgundy"
            >
              ADD TO CART — {formatPrice(product.price)}
            </button>
            <p className="mt-4 text-center text-[11px] tracking-wide text-muted-foreground">
              Free shipping in Taiwan over NT$ 2,000 · 14-day returns
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}
