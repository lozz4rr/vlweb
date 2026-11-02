'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e1c1a]/10 bg-[#efe8da]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* 左側：品牌 Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-black tracking-tighter text-[#1e1c1a]">
            VL
          </span>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#1e1c1a]/70">
            VISUAL LEGACY
          </span>
        </Link>

        {/* 中間：導覽連結（已完全移除 GRAPHICS 及下拉選單） */}
        <nav className="hidden items-center gap-8 font-mono text-xs font-medium tracking-[0.15em] md:flex">
          <Link
            href="/#new-drop"
            className="text-[#1e1c1a]/70 transition-colors hover:text-[#1e1c1a]"
          >
            NEW DROP
          </Link>
          <Link
            href="/#t-shirts"
            className="text-[#1e1c1a]/70 transition-colors hover:text-[#1e1c1a]"
          >
            T-SHIRTS
          </Link>
          <Link
            href="/#accessories"
            className="text-[#1e1c1a]/70 transition-colors hover:text-[#1e1c1a]"
          >
            ACCESSORIES
          </Link>
          <Link
            href="/#story"
            className="text-[#1e1c1a]/70 transition-colors hover:text-[#1e1c1a]"
          >
            STORY
          </Link>
          <Link
            href="/#about"
            className="text-[#1e1c1a]/70 transition-colors hover:text-[#1e1c1a]"
          >
            ABOUT VL
          </Link>
        </nav>

        {/* 右側：購物車圖示 */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative text-[#1e1c1a]/80 transition-colors hover:text-[#1e1c1a]"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
