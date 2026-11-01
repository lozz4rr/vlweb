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
  const [selectedColor, setSelectedColor] = useState<'black' | 'white'>('white')
  const [selectedSize, setSelectedSize] = useState<string>('M')

  if (!product) return null

  // 取得商品圖片（相容正面與背部，或黑白切換）
  const getImageSrc = () => {
    if (selectedColor === 'black' && product.images?.back) {
      return product.images.back
    }
    return product.images?.front || (product as any).image || ''
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-none border border-black/10 bg-[#efe8da] shadow-2xl md:flex-row">
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 z-10 text-neutral-500 transition-colors hover:text-black"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 左側：商品大圖 */}
        <div className="relative aspect-square w-full bg-[#e8e1d3] md:w-1/2">
          <Image
            src={getImageSrc()}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* 右側：商品說明與購買選單 */}
        <div className="flex w-full flex-col justify-between overflow-y-auto p-6 md:w-1/2 md:p-8">
          <div>
            {/* 標題與副標 */}
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1e1c1a] md:text-4xl">
              {product.id === 'vulung' || product.name.toLowerCase().includes('vulung')
                ? 'vulung / 百步蛇'
                : product.id === 'kadjiadji' || product.name.toLowerCase().includes('kadjiadji')
                ? 'kadjiadji / 太陽'
                : product.name}
            </h2>
            <p className="mt-1 text-xs tracking-wider text-[#1e1c1a]/60">
              {product.subtitle || '百步蛇與太陽'}
            </p>

            {/* 價格區塊與預購折扣標籤 */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-2xl font-black text-[#1e1c1a]">
                NT$ {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="font-mono text-sm text-[#1e1c1a]/40 line-through">
                  NT$ {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="rounded bg-[#f4dcd6] px-2 py-0.5 text-[11px] font-medium text-[#b34032]">
                預購折扣
              </span>
            </div>

            {/* 文化理念介紹 */}
            <div className="mt-6 space-y-3 text-xs leading-relaxed text-[#1e1c1a]/80">
              <p>
                來自排灣文化中的百步蛇與太陽意象，以潮流風格重新詮釋。
                <br />
                讓來自根源的故事走進日常，繼續被看見。
              </p>
              <p className="font-serif italic text-[#1e1c1a]/60">
                Inspired by the hundred-pacer viper and sun motifs in Paiwan culture, reimagined through a contemporary streetwear style. Bringing stories from roots into everyday life, so they continue to be seen.
              </p>
            </div>

            {/* 衣服顏色切換 */}
            <div className="mt-6 border-t border-black/10 pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#1e1c1a]">衣服顏色</span>
                <span className="text-[#1e1c1a]/60">
                  {selectedColor === 'white' ? 'White 白' : 'Black 黑'}
                </span>
              </div>
              <div className="mt-2.5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedColor('white')}
                  className={`h-7 w-7 rounded-full border-2 bg-white transition-all ${
                    selectedColor === 'white'
                      ? 'border-[#1e1c1a] scale-110 shadow-sm'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  aria-label="White"
                />
                <button
                  type="button"
                  onClick={() => setSelectedColor('black')}
                  className={`h-7 w-7 rounded-full border-2 bg-[#181818] transition-all ${
                    selectedColor === 'black'
                      ? 'border-[#1e1c1a] scale-110 shadow-sm'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  aria-label="Black"
                />
              </div>
            </div>

            {/* 尺寸選擇 */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#1e1c1a]">尺寸</span>
                <span className="text-[#1e1c1a]/60">{selectedSize}</span>
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-10 items-center justify-center font-mono text-xs font-bold transition-colors ${
                      selectedSize === size
                        ? 'bg-[#1e1c1a] text-[#efe8da]'
                        : 'border border-black/15 bg-transparent text-[#1e1c1a] hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 加入預購按鈕 */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => {
                alert(`已選取：${product.name}（${selectedColor.toUpperCase()} / ${selectedSize}）`)
                onClose()
              }}
              className="w-full bg-[#1e1c1a] py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-[#efe8da] transition-transform duration-150 hover:bg-[#1e1c1a]/90 active:scale-[0.99]"
            >
              PRE-ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
