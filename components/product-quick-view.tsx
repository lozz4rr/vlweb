'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { Product } from '@/lib/products'

interface ProductQuickViewProps {
  product: Product | null
  onClose: () => void
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const [selectedView, setSelectedView] = useState<'front' | 'back'>('front')
  const [selectedSize, setSelectedSize] = useState<string>('M')

  if (!product) return null

  const isSale = product.originalPrice && product.originalPrice > product.price
  const discountPercent = isSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const currentImage =
    selectedView === 'back' && product.images?.back
      ? product.images.back
      : product.images?.front || ''

  const handleAddToCart = () => {
    alert(`已加入購物車：${product.name} (${selectedSize})`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden border border-ink/20 bg-cream p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 text-ink/60 transition-colors hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 左側：商品圖片 */}
          <div className="relative aspect-square w-full overflow-hidden bg-black/5">
            {currentImage && (
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {isSale && (
              <span className="absolute left-3 top-3 bg-red-600 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-white">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* 右側：商品資訊與選項 */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
                {product.graphics?.join(' / ')}
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
                {product.name}
              </h3>
              <p className="mt-0.5 text-xs tracking-wider text-ink/60">
                {product.subtitle}
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-ink">
                  NT$ {product.price.toLocaleString()}
                </span>
                {isSale && (
                  <span className="font-mono text-sm text-red-600/70 line-through">
                    NT$ {product.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>

              {/* 視角切換（若有背面圖） */}
              {product.images?.back && (
                <div className="mt-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink/70">
                    VIEW
                  </span>
                  <div className="mt-2.5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedView('front')}
                      className={`px-3 py-1 font-mono text-xs font-semibold tracking-wider transition-colors ${
                        selectedView === 'front'
                          ? 'bg-ink text-cream'
                          : 'border border-ink/20 text-ink hover:border-ink'
                      }`}
                    >
                      FRONT
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedView('back')}
                      className={`px-3 py-1 font-mono text-xs font-semibold tracking-wider transition-colors ${
                        selectedView === 'back'
                          ? 'bg-ink text-cream'
                          : 'border border-ink/20 text-ink hover:border-ink'
                      }`}
                    >
                      BACK
                    </button>
                  </div>
                </div>
              )}

              {/* 尺寸選擇 */}
              <div className="mt-6">
                <span className="font-mono text-xs uppercase tracking-wider text-ink/70">
                  SIZE
                </span>
                <div className="mt-2.5 flex gap-2">
                  {['M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-9 w-11 items-center justify-center font-mono text-xs font-semibold tracking-wider transition-colors ${
                        selectedSize === size
                          ? 'bg-ink text-cream'
                          : 'border border-ink/20 text-ink hover:border-ink'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              type="button"
              className="mt-8 flex w-full items-center justify-center bg-ink py-3.5 font-mono text-xs font-bold tracking-[0.25em] text-cream transition-transform duration-150 hover:bg-ink/90 active:scale-[0.99]"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
