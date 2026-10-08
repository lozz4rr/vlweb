'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { cn } from '@/lib/utils'

const graphics = ['VULUNG', 'KADJIADJI', 'SUN', 'HUMAN FIGURE', 'ARCHIVE']

const links = [
  { label: 'NEW DROP', href: '#new-drop' },
  { label: 'T-SHIRTS', href: '#new-drop' },
  { label: 'GRAPHICS', href: '#graphics', dropdown: graphics },
  { label: 'ACCESSORIES', href: '#lookbook' },
  { label: 'STORY', href: '#vulung' },
  { label: 'ABOUT VL', href: '#story' },
]

export function SiteHeader() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { count, openCart } = useCart()

  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 40))

  const isSolid = solid || mobileOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-500',
        isSolid ? 'border-b border-border bg-cream/95 text-ink backdrop-blur-sm' : 'bg-transparent text-cream',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="flex items-baseline gap-2" aria-label="VL — Visual Legacy, back to top">
          <span className="font-display text-3xl font-extrabold leading-none tracking-tight">VL</span>
          <span className="hidden font-display text-sm font-semibold tracking-[0.2em] sm:inline">VISUAL LEGACY</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) =>
              link.dropdown ? (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-medium tracking-[0.18em]"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen((v) => !v)}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn('size-3.5 transition-transform duration-300', dropdownOpen && 'rotate-180')}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 border border-border bg-cream py-3 text-ink shadow-sm"
                      >
                        {link.dropdown.map((item) => (
                          <li key={item}>
                            <a
                              href="#graphics"
                              onClick={() => setDropdownOpen(false)}
                              className="block px-5 py-2 text-xs font-medium tracking-[0.18em] transition-colors hover:bg-secondary hover:text-burgundy"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative text-xs font-medium tracking-[0.18em] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-500 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative flex size-10 items-center justify-center"
            aria-label={`Open bag, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} aria-hidden />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute right-0.5 top-0.5 flex size-4.5 items-center justify-center rounded-full bg-burgundy text-[10px] font-bold text-cream"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-cream lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {links.map((link) => (
                <li key={link.label} className="border-b border-border/60 last:border-0">
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 font-display text-2xl font-bold tracking-wide"
                  >
                    {link.label}
                  </a>
                  {link.dropdown && (
                    <ul className="flex flex-wrap gap-x-4 gap-y-2 pb-4">
                      {link.dropdown.map((item) => (
                        <li key={item}>
                          <a
                            href="#graphics"
                            onClick={() => setMobileOpen(false)}
                            className="text-xs tracking-[0.18em] text-muted-foreground"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
