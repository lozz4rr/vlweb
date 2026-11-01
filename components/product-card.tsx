'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { formatPrice, type Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  index: number
  onView: (product: Product) => void
}

export function ProductCard({ product, index, onView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const currentImage = hovered && product.images.back ? product.images.back : product.images.front

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      {/* 圖片區塊 */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-secondary cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onView(product)}
      >
        <Image
          src={currentImage}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {product.isNew && (
          <span className="absolute left-4 top-4 bg-cream px-2.5 py-1 text-[10px] font-semibold tracking-widest text-ink">
            NEW
          </span>
        )}

        {/* 懸浮快速預覽按鈕 */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onView(product)
            }}
            className="flex items-center gap-2 bg-cream px-5 py-2.5 text-xs font-medium tracking-[0.2em] text-ink shadow-lg transition-transform hover:scale-105"
          >
            <Eye className="size-4" /> QUICK VIEW
          </button>
        </div>
      </div>

      {/* 資訊與價格區塊 */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              onClick={() => onView(product)}
              className="font-display font-serif-tc text-lg font-bold tracking-tight text-ink cursor-pointer hover:opacity-70 transition-opacity"
            >
              {product.name}
            </h3>
            <p className="font-serif-tc text-xs text-muted-foreground">{product.subtitle}</p>
          </div>

          {/* 價格：特價 680、劃掉原價 750、預購折扣標籤 */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-burgundy/10 px-1.5 py-0.5 text-[10px] font-semibold text-burgundy">
                預購折扣
              </span>
              <span className="font-display text-base font-bold text-burgundy">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.originalPrice && (
              <span className="font-display text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* 顏色小圓點（右側原本的 Fit 版型文字已完全移除） */}
        <div className="mt-3 flex items-center pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="size-2.5 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
