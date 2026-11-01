'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Product, ProductColor, ProductSize } from '@/lib/products'

interface ProductQuickViewProps {
  product: Product | null
  onClose: () => void
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState<ProductColor>('black')
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M')

  if (!product) return null

  const isSale = product.originalPrice && product.originalPrice > product.price
  const discountPercent = isSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      image: selectedColor === 'white' ? product.images.white : product.images.black,
      quantity: 1,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-none border border-ink/20 bg-cream p-6 shadow-2xl md:p-8">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 text-ink/60 transition-colors hover:text-ink"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden bg-black/5">
            <Image
              src={selectedColor === 'white' ? product.images.white : product.images.black}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {isSale && (
              <span className="absolute left-3 top-3 bg-red-600 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-white">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
                {product.graphics.join(' / ')}
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
                {product.name}
              </h3>
              <p className="mt-0.5 text-xs tracking-wider text-ink/60">
                {product.subtitle}
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-ink">
                  NT\$ {product.price.toLocaleString()}
                </span>
                {isSale && (
                  <span className="font-mono text-sm text-red-600/70 line-through">
                    NT\$ {product.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <span className="font-mono text-xs uppercase tracking-wider text-ink/70">
                  COLOR: <span className="font-bold text-ink uppercase">{selectedColor}</span>
                </span>
                <div className="mt-2.5 flex gap-3">
                  {(['black', 'white'] as ProductColor[]).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`h-7 w-7 rounded-full border-2 transition-transform ${
                        color === 'black' ? 'bg-[#181818]' : 'bg-white'
                      } ${
                        selectedColor === color
                          ? 'border-ink scale-110 shadow-sm'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <span className="font-mono text-xs uppercase tracking-wider text-ink/70">
                  SIZE
                </span>
                <div className="mt-2.5 flex gap-2">
                  {(['M', 'L', 'XL'] as ProductSize[]).map((size) => (
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
