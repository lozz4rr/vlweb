'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatPrice, type Product } from '@/lib/products'

type ProductCardProps = {
  product: Product
  index: number
  onView: (product: Product) => void
}

export function ProductCard({ product, index, onView }: ProductCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-secondary text-left"
        aria-label={`View ${product.name} ${product.subtitle}`}
      >
        <Image
          src={product.images.front || '/placeholder.svg'}
          alt={`${product.name} ${product.subtitle}, front`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
        />
        <Image
          src={product.images.back || '/placeholder.svg'}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-cream px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] text-ink">
            NEW
          </span>
        )}
        <span className="absolute inset-x-3 bottom-3 translate-y-3 bg-ink py-3 text-center text-[11px] font-medium tracking-[0.25em] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          VIEW PRODUCT →
        </span>
      </button>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold leading-tight tracking-wide">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.subtitle}</p>
          <p className="mt-0.5 font-serif-tc text-xs text-muted-foreground/80">{product.nameZh}</p>
        </div>
        <p className="shrink-0 text-sm font-medium">{formatPrice(product.price)}</p>
      </div>
      <div className="mt-3 flex items-center gap-1.5" aria-label={`Print colors: ${product.colors.map((c) => c.name).join(', ')}`}>
        {product.colors.map((color) => (
          <span
            key={color.name}
            className="size-3 rounded-full border border-ink/20"
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
        <span className="ml-2 text-[11px] tracking-wide text-muted-foreground">{product.fit}</span>
      </div>
    </motion.article>
  )
}
