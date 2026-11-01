'use client'

import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/20 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12 md:pt-20">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-8">
          
          <div className="pointer-events-none flex select-none flex-col justify-between lg:col-span-7">
            <div className="font-display text-[clamp(5rem,14vw,12rem)] font-extrabold uppercase leading-[0.76] tracking-tight text-cream/15">
              <div>VISUAL</div>
              <div>LEGACY</div>
            </div>
            
            <div className="hidden pt-8 text-[10px] tracking-[0.25em] text-cream/40 lg:block">
              © {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.
            </div>
          </div>

          <div className="flex flex-col justify-start gap-8 lg:col-span-5 lg:pl-6">
            <div className="flex gap-16 sm:gap-24">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
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

              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
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

            <div className="pt-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
                VL — 2026
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-tight text-cream sm:text-2xl">
                MADE TODAY. TRADITION TOMORROW.
              </h3>
              <p className="mt-2 text-sm tracking-widest text-cream/70">
                現代的創作就是未來的傳統
              </p>
            </div>

            <div className="block border-t border-cream/10 pt-6 text-[10px] tracking-widest text-cream/40 lg:hidden">
              <span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
