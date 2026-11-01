'use client'

import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1e1c1a]/15 bg-[#1e1c1a] text-[#efe8da]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12 md:pt-20">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* 左側：兩行大字，緊湊剛好不重疊 */}
          <div className="pointer-events-none flex select-none flex-col justify-between lg:col-span-7">
            <div className="font-display text-[clamp(4.5rem,13vw,11.5rem)] font-extrabold uppercase leading-[0.86] tracking-tight text-[#efe8da]/15">
              <div>VISUAL</div>
              <div>LEGACY</div>
            </div>
            
            <div className="hidden pt-8 font-mono text-[10px] tracking-[0.25em] text-[#efe8da]/40 lg:block">
              © {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* 右側：選單與品牌理念 */}
          <div className="flex flex-col justify-start gap-10 lg:col-span-5 lg:pl-6">
            <div className="flex gap-16 sm:gap-24">
              {/* HELP */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efe8da]/40">
                  HELP
                </span>
                <ul className="mt-4 space-y-2.5 font-mono text-xs tracking-wider">
                  <li>
                    <Link href="#help" className="text-[#efe8da]/80 transition-colors hover:text-[#efe8da]">
                      Size Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#help" className="text-[#efe8da]/80 transition-colors hover:text-[#efe8da]">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link href="#help" className="text-[#efe8da]/80 transition-colors hover:text-[#efe8da]">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* VL */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efe8da]/40">
                  VL
                </span>
                <ul className="mt-4 space-y-2.5 font-mono text-xs tracking-wider">
                  <li>
                    <Link href="#about" className="text-[#efe8da]/80 transition-colors hover:text-[#efe8da]">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#story" className="text-[#efe8da]/80 transition-colors hover:text-[#efe8da]">
                      Story
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#efe8da]/80 transition-colors hover:text-[#efe8da]"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 品牌理念說明 */}
            <div className="pt-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#efe8da]/40">
                VL — 2026
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-tight text-[#efe8da] sm:text-2xl">
                MADE TODAY. TRADITION TOMORROW.
              </h3>
              <p className="mt-2 text-sm tracking-widest text-[#efe8da]/70">
                現代的創作就是未來的傳統
              </p>
            </div>

            <div className="block border-t border-[#efe8da]/10 pt-6 font-mono text-[10px] tracking-widest text-[#efe8da]/40 lg:hidden">
              <span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
