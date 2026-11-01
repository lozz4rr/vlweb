'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { products } from '@/lib/products'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.id as string

  // 尋找對應商品，找不到時預設抓第一筆
  const product = products.find((p) => p.id === productId) || products[0]

  const [selectedColor, setSelectedColor] = useState<'white' | 'black'>('white')
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
    <main className="min-h-screen bg-[#efe8da] text-[#1e1c1a]">
      {/* 頂部返回導覽 */}
      <div className="mx-auto max-w-7xl px-6 pt-8 md:px-12">
        <Link
          href="/#new-drop"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#1e1c1a]/60 transition-colors hover:text-[#1e1c1a]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO COLLECTION</span>
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* 左側：商品大圖 */}
          <div className="relative aspect-square w-full overflow-hidden bg-[#e8e1d3] lg:col-span-7">
            <Image
              src={getImageSrc()}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>

          {/* 右側：商品資訊與購買設定 */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              {/* 中英雙排標題與副標 */}
              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1e1c1a] md:text-5xl">
                {product.id === 'vulung' || product.name.toLowerCase().includes('vulung')
                  ? 'vulung / 百步蛇'
                  : product.id === 'kadjiadji' || product.name.toLowerCase().includes('kadjiadji')
                  ? 'kadjiadji / 太陽'
                  : product.name}
              </h1>
              <p className="mt-1.5 text-sm tracking-wider text-[#1e1c1a]/60">
                {product.subtitle || '百步蛇與太陽'}
              </p>

              {/* 價格與預購折扣標籤 */}
              <div className="mt-6 flex items-center gap-3">
                <span className="font-mono text-3xl font-black text-[#1e1c1a]">
                  NT$ {product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="font-mono text-base text-[#1e1c1a]/40 line-through">
                    NT$ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="rounded bg-[#f4dcd6] px-2.5 py-1 text-xs font-medium text-[#b34032]">
                  預購折扣
                </span>
              </div>

              {/* 文化理念文案 */}
              <div className="mt-8 space-y-4 border-t border-black/10 pt-6 text-sm leading-relaxed text-[#1e1c1a]/80">
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
              <div className="mt-8 border-t border-black/10 pt-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                  <span className="text-[#1e1c1a]">衣服顏色</span>
                  <span className="text-[#1e1c1a]/60">
                    {selectedColor === 'white' ? 'White 白' : 'Black 黑'}
                  </span>
                </div>
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedColor('white')}
                    className={`h-8 w-8 rounded-full border-2 bg-white transition-all ${
                      selectedColor === 'white'
                        ? 'border-[#1e1c1a] scale-110 shadow-sm'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    aria-label="White"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedColor('black')}
                    className={`h-8 w-8 rounded-full border-2 bg-[#181818] transition-all ${
                      selectedColor === 'black'
                        ? 'border-[#1e1c1a] scale-110 shadow-sm'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    aria-label="Black"
                  />
                </div>
              </div>

              {/* 尺寸選擇 */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                  <span className="text-[#1e1c1a]">尺寸</span>
                  <span className="text-[#1e1c1a]/60">{selectedSize}</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2.5">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-11 items-center justify-center font-mono text-xs font-bold transition-colors ${
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
            <div className="mt-10">
              <button
                type="button"
                onClick={() => {
                  alert(`已選取預購：${product.name}（${selectedColor.toUpperCase()} / ${selectedSize}）`)
                }}
                className="w-full bg-[#1e1c1a] py-4 font-mono text-xs font-bold tracking-[0.25em] text-[#efe8da] transition-transform duration-150 hover:bg-[#1e1c1a]/90 active:scale-[0.99]"
              >
                PRE-ORDER NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
