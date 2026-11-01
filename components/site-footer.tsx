'use client'

import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/20 bg-ink text-cream">
      {/* 上方選單區塊：HELP 與 VL 保持原有的左對齊排版風格 */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 md:px-8 md:pt-20">
        <div className="flex justify-center gap-20 sm:gap-36 text-left">
          {/* HELP 欄位 */}
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/50">
              HELP
            </span>
            <ul className="mt-4 space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="#help" className="text-cream/80 transition-colors hover:text-cream">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#help" className="text-cream/80 transition-colors hover:text-cream">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#help" className="text-cream/80 transition-colors hover:text-cream">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* VL 欄位 */}
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/50">
              VL
            </span>
            <ul className="mt-4 space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="#about" className="text-cream/80 transition-colors hover:text-cream">
                  About
                </Link>
              </li>
              <li>
                <Link href="#story" className="text-cream/80 transition-colors hover:text-cream">
                  Story
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 transition-colors hover:text-cream"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 原本的大型滿版 VISUAL LEGACY：不限寬度、緊貼底部、橫跨螢幕 */}
      <div className="w-full overflow-hidden select-none pointer-events-none px-4">
        <p className="font-display text-[clamp(4.5rem,19vw,16rem)] font-extrabold uppercase leading-[0.75] tracking-tight text-cream/15 text-center whitespace-nowrap">
          VISUAL LEGACY
        </p>
      </div>

      {/* 底部微型版權標註 */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-[10px] tracking-widest text-cream/40 sm:flex-row">
          <span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
          <span>MADE IN TAIWAN</span>
        </div>
      </div>
    </footer>
  )
}
