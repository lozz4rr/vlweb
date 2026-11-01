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
  const [selectedColor, setSelectedColor] = useState<'white' | 'black'>('white')
  const [selectedSize, setSelectedSize] = useState<string>('M')

  if (!product) return null

  // 精準相容各種商品圖片資料結構，避免破圖
  const getImageSrc = () => {
    const anyProd = product as any
    if (selectedColor === 'black') {
      if (anyProd.images?.black) return anyProd.images.black
      if (anyProd.images?.back) return anyProd.images.back
    } else {
      if (anyProd.images?.white) return anyProd.images.white
      if (anyProd.images?.front) return anyProd.images.front
    }
    if (typeof anyProd.images === 'string') return anyProd.images
    if (anyProd.image) return anyProd.image
    if (anyProd.images?.front) return anyProd.images.front
    return ''
  }

  const currentImage = getImageSrc()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-none border border-[#1e1c1a]/10 bg-[#f2ede4] shadow-2xl md:flex-row">
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 z-20 text-[#1e1c1a]/50 transition-colors hover:text-[#1e1c1a]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 左側：商品大圖 */}
        <div className="relative aspect-square w-full bg-[#e8e0d2] md:w-1/2">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-[#1e1c1a]/40">
              NO IMAGE
            </div>
          )}
        </div>

        {/* 右側：商品說明與選項 */}
        <div className="flex w-full flex-col justify-between overflow-y-auto p-6 md:w-1/2 md:p-8">
          <div>
            {/* 標題與副標 */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1a1715] md:text-4xl">
                <span className="font-serif italic font-medium">vulung</span>
                <span className="mx-1 font-light text-[#1a1715]/40 font-sans">／</span>
                <span style={{ fontFamily: '"Noto Serif TC", "Songti TC", serif' }} className="font-bold">
                  百步蛇
                </span>
              </h2>
              <p className="mt-1 text-xs tracking-wider text-[#1a1715]/60 font-sans">
                百步蛇與太陽
              </p>
            </div>

            {/* 價格與預購折扣標籤 */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-2xl font-black text-[#1a1715]">
                NT$ 680
              </span>
              <span className="font-mono text-xs text-[#1a1715]/40 line-through">
                NT$ 750
              </span>
              <span className="rounded bg-[#e8d3cb] px-2 py-0.5 text-[11px] font-medium text-[#7a3528] font-sans">
                預購折扣
              </span>
            </div>

            {/* 文化理念介紹（完全還原截圖的細黑體與斜體英文） */}
            <div className="mt-6 space-y-3 font-sans text-xs leading-relaxed text-[#2c2825]">
              <p className="font-normal text-[#2c2825]/90">
                取自排灣文化中的百步蛇與太陽意象，以潮流風格重新詮釋。
                <br />
                讓來自根源的故事走進日常，繼續被看見。
              </p>
              <p className="italic text-[#2c2825]/60 font-light text-[11px] leading-normal">
                Inspired by the hundred-pacer viper and sun motifs in Paiwan culture, reimagined through a contemporary streetwear style. Bringing stories from roots into everyday life, so they continue to be seen.
              </p>
            </div>

            {/* 衣服顏色切換區 */}
            <div className="mt-8 border-t border-[#1a1715]/10 pt-5">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-[#1a1715]/80">衣服顏色</span>
                <span className="text-xs text-[#1a1715]/80">
                  {selectedColor === 'white' ? 'White 白' : 'Black 黑'}
                </span>
              </div>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedColor('white')}
                  className={`h-7 w-7 rounded-full border-2 bg-white transition-all ${
                    selectedColor === 'white'
                      ? 'border-[#1a1715] scale-110 shadow-sm'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  aria-label="White 白"
                />
                <button
                  type="button"
                  onClick={() => setSelectedColor('black')}
                  className={`h-7 w-7 rounded-full border-2 bg-[#181818] transition-all ${
                    selectedColor === 'black'
                      ? 'border-[#1a1715] scale-110 shadow-sm'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  aria-label="Black 黑"
                />
              </div>
            </div>

            {/* 尺寸選擇 */}
            <div className="mt-5">
              <div className="mb-2 text-right font-mono text-xs text-[#1a1715]">
                {selectedSize}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-9 items-center justify-center font-mono text-xs transition-colors ${
                      selectedSize === size
                        ? 'bg-[#181614] text-[#f2ede4] font-bold'
                        : 'border border-[#1a1715]/15 bg-[#ece6db]/60 text-[#1a1715] hover:border-[#1a1715]/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 預購按鈕 */}
          <div className="mt-8 pt-2">
            <button
              type="button"
              onClick={() => {
                alert(`已選取：${product.name}（${selectedColor.toUpperCase()} / ${selectedSize}）`)
                onClose()
              }}
              className="w-full bg-[#181614] py-3.5 font-mono text-xs font-bold tracking-[0.25em] text-[#f2ede4] transition-all hover:bg-[#2c2825] active:scale-[0.99]"
            >
              PRE-ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
