'use client'

import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/20 bg-ink text-cream">
      {/* 上方導航與品牌理念區塊 */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-14 md:px-12 md:pt-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          {/* 左側：品牌精神 */}
          <div className="max-w-md">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/40">
              VL — VISUAL LEGACY
            </span>
            <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-cream md:text-3xl">
              MADE TODAY. TRADITION TOMORROW.
            </h3>
            <p className="mt-3 font-serif-tc text-sm leading-relaxed tracking-wider text-cream/70 md:text-base">
              現代的創作就是未來的傳統
            </p>
          </div>

          {/* 右側：選單連結群組（固定寬度與合理間距，結構緊湊精緻） */}
          <div className="flex gap-16 sm:gap-24">
            {/* HELP */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
                HELP
              </span>
              <ul className="mt-4 space-y-3 text-xs tracking-wider">
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
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
                VL
              </span>
              <ul className="mt-4 space-y-3 text-xs tracking-wider">
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

      {/* 底層大型滿版 VISUAL LEGACY（精準絕對置中） */}
      <div className="relative flex w-full justify-center overflow-hidden pointer-events-none select-none">
        <p className="font-display text-[clamp(4rem,18.5vw,15.5rem)] font-extrabold uppercase leading-[0.72] tracking-tighter text-cream/15 text-center whitespace-nowrap">
          VISUAL LEGACY
        </p>
      </div>

      {/* 最下緣版權標註 */}
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 text-[10px] tracking-widest text-cream/40 sm:flex-row">
          <span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
          <span>MADE IN TAIWAN</span>
        </div>
      </div>
    </footer>
  )
}
