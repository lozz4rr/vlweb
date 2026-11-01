'use client'

import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0F1115] text-[#FCBF49]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12 md:pt-20">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* 左側：兩行大字，緊湊微透 */}
          <div className="pointer-events-none flex select-none flex-col justify-between lg:col-span-7">
            <div className="font-display text-[clamp(5.5rem,15vw,13.5rem)] font-extrabold uppercase leading-[0.74] tracking-tight text-white/10">
              <div>VISUAL</div>
              <div>LEGACY</div>
            </div>
            
            <div className="hidden pt-8 text-[10px] tracking-[0.25em] text-[#FCBF49]/40 lg:block">
              © {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* 右側：上半部選單 + 下半部品牌介紹 */}
          <div className="flex flex-col justify-start gap-8 lg:col-span-5 lg:pl-6">
            <div className="flex gap-16 sm:gap-24">
              {/* HELP */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FCBF49]/50">
                  HELP
                </span>
                <ul className="mt-4 space-y-2.5 text-xs tracking-wider">
                  <li>
                    <Link href="#help" className="text-[#FCBF49]/80 transition-colors hover:text-[#FCBF49]">
                      Size Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#help" className="text-[#FCBF49]/80 transition-colors hover:text-[#FCBF49]">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link href="#help" className="text-[#FCBF49]/80 transition-colors hover:text-[#FCBF49]">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* VL */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FCBF49]/50">
                  VL
                </span>
                <ul className="mt-4 space-y-2.5 text-xs tracking-wider">
                  <li>
                    <Link href="#about" className="text-[#FCBF49]/80 transition-colors hover:text-[#FCBF49]">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#story" className="text-[#FCBF49]/80 transition-colors hover:text-[#FCBF49]">
                      Story
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FCBF49]/80 transition-colors hover:text-[#FCBF49]"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 右邊下半：品牌標語 */}
            <div className="pt-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FCBF49]/50">
                VL — 2026
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-tight text-[#FCBF49] sm:text-2xl">
                MADE TODAY. TRADITION TOMORROW.
              </h3>
              <p className="mt-2 font-serif-tc text-sm tracking-widest text-[#FCBF49]/70">
                現代的創作就是未來的傳統
              </p>
            </div>

            <div className="block border-t border-white/10 pt-6 text-[10px] tracking-widest text-[#FCBF49]/40 lg:hidden">
              <span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
