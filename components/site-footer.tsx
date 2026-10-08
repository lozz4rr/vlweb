'use client'

import { useState } from 'react'

const columns = [
  { title: 'SHOP', links: ['New Drop', 'T-Shirts', 'Graphics', 'Accessories'] },
  { title: 'HELP', links: ['Size Guide', 'Shipping', 'Returns', 'Contact'] },
  { title: 'VL', links: ['About', 'Story', 'Lookbook', 'Instagram'] },
]

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-serif text-3xl italic md:text-4xl">Join the legacy.</p>
            <p className="mt-2 font-serif-tc text-sm text-cream/60">訂閱電子報，搶先收到新品發售消息。</p>
            {subscribed ? (
              <p className="mt-8 text-sm text-mustard" role="status">
                Thank you — see you at the next drop.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubscribed(true)
                }}
                className="mt-8 flex max-w-md border-b border-cream/40 focus-within:border-cream"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="flex-1 bg-transparent py-3 text-sm placeholder:text-cream/40 focus:outline-none"
                />
                <button type="submit" className="text-xs font-medium tracking-[0.25em] hover:text-mustard">
                  SUBSCRIBE →
                </button>
              </form>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-medium tracking-[0.3em] text-cream/50">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#top" className="text-sm text-cream/80 transition-colors hover:text-cream">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p
          className="mt-20 select-none font-display text-[22vw] font-extrabold leading-[0.8] tracking-tighter text-cream/10 lg:text-[18vw]"
          aria-hidden
        >
          VISUAL LEGACY
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-cream/15 pt-6 text-[11px] tracking-[0.2em] text-cream/50 md:flex-row md:justify-between">
          <span>© 2026 VL — VISUAL LEGACY. KAOHSIUNG, TAIWAN.</span>
          <span>MADE TODAY. TRADITION TOMORROW.</span>
        </div>
      </div>
    </footer>
  )
}
