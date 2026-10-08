'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProductCard } from '@/components/product-card'
import { ProductQuickView } from '@/components/product-quick-view'
import { products, type GraphicTag, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

const filters: { label: string; value: GraphicTag | 'all' }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'VULUNG', value: 'vulung' },
  { label: 'KADJIADJI', value: 'kadjiadji' },
  { label: 'SUN', value: 'sun' },
  { label: 'LOGO', value: 'logo' },
]

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'popular'

const sortOptions: { label: string; value: SortKey }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
]

const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
  newest: (a, b) => b.releasedAt.localeCompare(a.releasedAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  popular: (a, b) => b.sold - a.sold,
}

export function NewDrop() {
  const [filter, setFilter] = useState<GraphicTag | 'all'>('all')
  const [sort, setSort] = useState<SortKey>('newest')
  const [active, setActive] = useState<Product | null>(null)

  const visible = useMemo(
    () =>
      products
        .filter((p) => filter === 'all' || p.graphics.includes(filter))
        .slice()
        .sort(sorters[sort]),
    [filter, sort],
  )

  return (
    <section id="new-drop" className="mx-auto max-w-[1440px] scroll-mt-16 px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium tracking-[0.35em] text-burgundy">DROP 02</p>
          <h2 className="mt-3 font-display text-6xl font-extrabold leading-none tracking-tight md:text-8xl">
            NEW DROP
          </h2>
          <p className="mt-3 font-serif text-xl italic text-muted-foreground">
            Four tees. Four stories. <span className="font-serif-tc not-italic text-base">四件T恤，四個故事。</span>
          </p>
        </motion.div>

        <label className="flex items-center gap-3 text-xs tracking-[0.2em]">
          <span className="text-muted-foreground">SORT BY</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border-b border-ink bg-transparent py-1.5 pr-6 text-xs font-medium tracking-[0.1em] focus:outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="mt-10 flex gap-2 overflow-x-auto border-y border-border py-4 [scrollbar-width:none]"
        role="group"
        aria-label="Filter by graphic"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className="relative shrink-0 px-4 py-2 text-xs font-medium tracking-[0.2em]"
          >
            {filter === f.value && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 bg-ink"
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              />
            )}
            <span className={cn('relative transition-colors duration-300', filter === f.value && 'text-cream')}>
              {f.label}
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onView={setActive} />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProductQuickView product={active} onClose={() => setActive(null)} />
    </section>
  )
}
