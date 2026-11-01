'use client'

import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/20 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-12 md:px-8 md:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* 左半部：品牌英文精神定位 */}
          <div className="md:col-span-6 lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/50">
              VL — VISUAL LEGACY
            </span>
            <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl text-cream">
              Made today. Tradition tomorrow.
            </h3>
            <p className="mt-3 max-w-md font-serif text-sm leading-relaxed text-cream/70 md:text-base">
              Inspired by roots, crafted for the streets. Preserving stories into everyday wear.
            </p>
          </div>

          {/* 右半部：HELP 與 VL 選單 */}
          <div className="grid grid-cols-2 gap-8 md:col-span-6 lg:col-span-5 md:justify-items-end">
            {/* HELP */}
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

            {/* VL */}
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
      </div>

      {/* 最底部滿版 VISUAL LEGACY 大字 */}
      <div className="w-full overflow-hidden select-none pointer-events-none px-4">
        <p className="font-display text-[clamp(4.5rem,19vw,16rem)] font-extrabold uppercase leading-[0.75] tracking-tight text-cream/15 text-center whitespace-nowrap">
          VISUAL LEGACY
        </p>
      </div>

      {/* 最下緣版權標註 */}
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-[10px] tracking-widest text-cream/40 sm:flex-row">
          <span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
          <span>MADE IN TAIWAN</span>
        </div>
      </div>
    </footer>
  )
}
