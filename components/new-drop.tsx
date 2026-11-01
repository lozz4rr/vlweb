'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/product-card'
import { ProductQuickView } from '@/components/product-quick-view'
import { products, type GraphicTag, type Product } from '@/lib/products'
@@ -42,37 +41,37 @@ export function NewDrop() {
})

return (
    <section id="new-drop" className="border-t border-border/60 bg-cream py-20 px-4 md:px-8">
    <section id="new-drop" className="border-t border-[#0A233A]/15 bg-[#FCBF49] px-4 py-20 text-[#0A233A] md:px-8">
<div className="mx-auto max-w-7xl">
        {/* 頂部標題區：改為 DROP 001，並已刪除副標題 */}
        {/* 頂部標題區 */}
<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
<div>
            <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
            <span className="font-mono text-xs tracking-[0.25em] text-[#0A233A]/70">
DROP 001
</span>
            <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight text-ink md:text-6xl">
            <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight text-[#0A233A] md:text-6xl">
NEW DROP
</h2>
</div>

{/* 排序選單 */}
<div className="flex items-center gap-3 self-start md:self-end">
            <span className="font-mono text-xs tracking-wider text-muted-foreground">SORT BY</span>
            <span className="font-mono text-xs tracking-wider text-[#0A233A]/70">SORT BY</span>
<select
value={sortOption}
onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="border-b border-ink bg-transparent py-1 font-mono text-xs font-medium text-ink focus:outline-none"
              className="border-b border-[#0A233A] bg-transparent py-1 font-mono text-xs font-medium text-[#0A233A] focus:outline-none"
>
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest" className="bg-[#FCBF49] text-[#0A233A]">Newest</option>
              <option value="popular" className="bg-[#FCBF49] text-[#0A233A]">Popular</option>
              <option value="price-asc" className="bg-[#FCBF49] text-[#0A233A]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#FCBF49] text-[#0A233A]">Price: High to Low</option>
</select>
</div>
</div>

{/* 分類按鈕 */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-border/60 pb-6">
        <div className="mt-8 flex flex-wrap gap-2 border-b border-[#0A233A]/15 pb-6">
{filterTabs.map((tab) => {
const active = activeFilter === tab.value
return (
@@ -83,8 +82,8 @@ export function NewDrop() {
className={cn(
'px-4 py-1.5 text-xs font-semibold tracking-[0.2em] transition-colors',
active
                    ? 'bg-ink text-cream'
                    : 'border border-border bg-transparent text-ink hover:border-ink',
                    ? 'bg-[#0A233A] text-[#FCBF49]'
                    : 'border border-[#0A233A]/40 bg-transparent text-[#0A233A] hover:border-[#0A233A]',
)}
>
{tab.label}
