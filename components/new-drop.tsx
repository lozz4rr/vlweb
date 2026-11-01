'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { ProductQuickView } from '@/components/product-quick-view'
import { products, type GraphicTag, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

type FilterTag = GraphicTag | 'all'
type SortOption = 'newest' | 'popular' | 'price-asc' | 'price-desc'

const filterTabs: { label: string; value: FilterTag }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'VULUNG', value: 'vulung' },
  { label: 'KADJIADJI', value: 'kadjiadji' },
]

export function NewDrop() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('all')
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return (b.releasedAt || '').localeCompare(a.releasedAt || '')
      case 'popular':
        return (b.sold || 0) - (a.sold || 0)
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      default:
        return 0
    }
  })

  const filteredProducts = sortedProducts.filter((p) => {
    if (activeFilter === 'all') return true
    return p.graphics?.includes(activeFilter)
  })

  return (
    <section id="new-drop" className="border-t border-border/60 bg-cream px-4 py-20 text-ink md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
              DROP 001
            </span>
            <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight text-ink md:text-6xl">
              NEW DROP
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="font-mono text-xs tracking-wider text-muted-foreground">SORT BY</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="border-b border-ink bg-transparent py-1 font-mono text-xs font-medium text-ink focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-border/60 pb-6">
          {filterTabs.map((tab) => {
            const active = activeFilter === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveFilter(tab.value)}
                className={cn(
                  'px-4 py-1.5 text-xs font-semibold tracking-[0.2em] transition-colors',
                  active
                    ? 'bg-ink text-cream'
                    : 'border border-border bg-transparent text-ink hover:border-ink',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </div>

      <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
