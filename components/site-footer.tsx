'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        {/* 只保留 HELP 與 VL，置中排列並刪除第三個項目 */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-28 text-center sm:text-left">
          {/* HELP */}
          <div>
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
              {/* 已刪除第 3 項 Returns */}
              <li>
                <Link href="#help" className="text-cream/80 transition-colors hover:text-cream">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* VL */}
          <div>
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
              {/* 已刪除第 3 項 Lookbook */}
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

        {/* 底部大型 VISUAL LEGACY 字樣與版權 */}
        <div className="mt-16 pt-12 border-t border-cream/10">
          <div className="overflow-hidden">
            <p className="font-display text-[clamp(2.5rem,11vw,9rem)] font-extrabold uppercase leading-[0.8] tracking-tight text-cream/15 text-center select-none">
              VISUAL LEGACY
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-[10px] tracking-widest text-cream/40 sm:flex-row">
            <span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
            <span>MADE IN TAIWAN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
