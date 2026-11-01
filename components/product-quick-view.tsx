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
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front')

  if (!product) return null

  // 解析商品中英文名稱
  const isKadjiadji = product.id === 'kadjiadji' || product.name.toLowerCase().includes('kadjiadji')
  const titleEn = isKadjiadji ? 'kadjiadji' : 'vulung'
  const titleZh = isKadjiadji ? '蝴蝶' : '百步蛇'
  const subtitle = isKadjiadji ? '蝴蝶' : '百步蛇與太陽'

  // 解析圖片路徑（支援 front / back / white / black）
  const getImageSrc = () => {
    const p = product as any
    if (viewSide === 'back') {
      return p.images?.back || p.images?.black || p.images?.front || p.image || ''
    }
    if (selectedColor === 'black') {
      return p.images?.black || p.images?.front || p.image || ''
    }
    return p.images?.white || p.images?.front || p.image || ''
  }

  const currentImage = getImageSrc()

  // 加入購物車 / 預購表單邏輯
  const handleAddToCart = () => {
    // 若你有 Google 表單或購物車 Context，直接串接於此
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE/viewform?usp=pp_url&entry.1=${encodeURIComponent(
      product.name
    )}&entry.2=${selectedColor}&entry.3=${selectedSize}`
    
    // 如果你有全域購物車，也能同步觸發：
    // addToCart({ ...product, selectedColor, selectedSize })
    
    alert(`已加入購物車：${titleEn}／${titleZh}（${selectedColor.toUpperCase()} / ${selectedSize}）\n點擊確認將前往填寫預購訂單！`)
    // window.open(formUrl, '_blank')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-none border border-[#1e1c1a]/15 bg-[#efe8da] shadow-2xl md:flex-row">
        {/* 右上角關閉按鈕 */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 z-20 text-[#1e1c1a]/60 transition-colors hover:text-[#1e1c1a]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 左側：商品大圖 + 底部 FRONT/BACK 切換按鈕 */}
        <div className="relative flex aspect-square w-full flex-col justify-between bg-[#e5dfd3] p-4 md:w-1/2">
          <div className="relative h-full w-full">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-xs text-[#1e1c1a]/40">
                {titleEn} / {titleZh}
              </div>
            )}
          </div>

          {/* FRONT / BACK 切換標籤 */}
          <div className="relative z-10 flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setViewSide('front')}
              className={`px-3 py-1 font-mono text-[10px] tracking-widest transition-colors ${
                viewSide === 'front'
                  ? 'bg-[#1e1c1a] text-[#efe8da]'
                  : 'bg-transparent text-[#1e1c1a]/60 hover:text-[#1e1c1a]'
              }`}
            >
              FRONT
            </button>
            <button
              type="button"
              onClick={() => setViewSide('back')}
              className={`px-3 py-1 font-mono text-[10px] tracking-widest transition-colors ${
                viewSide === 'back'
                  ? 'bg-[#1e1c1a] text-[#efe8da]'
                  : 'bg-transparent text-[#1e1c1a]/60 hover:text-[#1e1c1a]'
              }`}
            >
              BACK
            </button>
          </div>
        </div>

        {/* 右側：商品資訊與購買選項 */}
        <div className="flex w-full flex-col justify-between overflow-y-auto p-6 md:w-1/2 md:p-8">
          <div>
            {/* 標題與副標 */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1e1c1a] md:text-4xl">
                <span className="font-serif italic font-medium">{titleEn}</span>
                <span className="mx-1 font-light text-[#1e1c1a]/40 font-sans">／</span>
                <span style={{ fontFamily: '"Noto Serif TC", "Songti TC", serif' }} className="font-bold">
                  {titleZh}
                </span>
              </h2>
              <p className="mt-1 text-xs tracking-wider text-[#1e1c1a]/60 font-sans">
                {subtitle}
              </p>
            </div>

            {/* 價格與預購折扣標籤 */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-2xl font-black text-[#1e1c1a]">
                NT$ 680
              </span>
              <span className="font-mono text-xs text-[#1e1c1a]/40 line-through">
                NT$ 750
              </span>
              <span className="rounded bg-[#e8d3cb] px-2 py-0.5 text-[11px] font-medium text-[#7a3528] font-sans">
                預購折扣
              </span>
            </div>

            {/* 文化理念介紹 */}
            <div className="mt-6 space-y-3 font-sans text-xs leading-relaxed text-[#2c2825]">
              {isKadjiadji ? (
                <>
                  <p className="font-normal text-[#2c2825]/90">
                    從排灣文化的蝴蝶圖紋出發，轉化為當代服飾語言。
                    <br />
                    把文化穿進生活，也讓故事在新的世代持續流動。
                  </p>
                  <p className="italic text-[#2c2825]/60 font-light text-[11px] leading-normal">
                    Drawing from butterfly motifs in Paiwan culture, the design transforms tradition into a contemporary visual language. Made to be worn today, while carrying its story into a new generation.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-normal text-[#2c2825]/90">
                    取自排灣文化中的百步蛇與太陽意象，以潮流風格重新詮釋。
                    <br />
                    讓來自根源的故事走進日常，繼續被看見。
                  </p>
                  <p className="italic text-[#2c2825]/60 font-light text-[11px] leading-normal">
                    Inspired by the hundred-pacer viper and sun motifs in Paiwan culture, reimagined through a contemporary streetwear style. Bringing stories from roots into everyday life, so they continue to be seen.
                  </p>
                </>
              )}
            </div>

            {/* COLOR 衣服顏色切換 */}
            <div className="mt-8 border-t border-[#1e1c1a]/10 pt-5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="tracking-wider text-[#1e1c1a]">
                  COLOR <span className="font-sans text-[#1e1c1a]/80">衣服顏色</span>
                </span>
                <span className="text-xs text-[#1e1c1a]/80">
                  {selectedColor === 'white' ? 'White 白' : 'Black 黑'}
                </span>
              </div>
              <div className="mt-3 flex gap-3">
                {/* 白底選鈕 */}
                <button
                  type="button"
                  onClick={() => setSelectedColor('white')}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                    selectedColor === 'white'
                      ? 'border-[#1e1c1a] p-0.5'
                      : 'border-transparent'
                  }`}
                  aria-label="White 白"
                >
                  <span className="h-full w-full rounded-full border border-black/20 bg-white" />
                </button>
                {/* 黑底選鈕 */}
                <button
                  type="button"
                  onClick={() => setSelectedColor('black')}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                    selectedColor === 'black'
                      ? 'border-[#1e1c1a] p-0.5'
                      : 'border-transparent'
                  }`}
                  aria-label="Black 黑"
                >
                  <span className="h-full w-full rounded-full bg-[#1e1c1a]" />
                </button>
              </div>
            </div>

            {/* SIZE 尺寸選擇 */}
            <div className="mt-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="tracking-wider text-[#1e1c1a]">
                  SIZE <span className="font-sans text-[#1e1c1a]/80">尺寸</span>
                </span>
                <span className="text-[#1e1c1a]">{selectedSize}</span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-9 items-center justify-center font-mono text-xs transition-colors ${
                      selectedSize === size
                        ? 'bg-[#1e1c1a] text-[#efe8da] font-bold'
                        : 'border border-[#1e1c1a]/20 bg-transparent text-[#1e1c1a] hover:border-[#1e1c1a]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 底部加入購物車按鈕 */}
          <div className="mt-8 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-[#1e1c1a] py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-[#efe8da] transition-all hover:bg-[#1e1c1a]/90 active:scale-[0.99]"
            >
              ADD TO CART — NT$ 680
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
