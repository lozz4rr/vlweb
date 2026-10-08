'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const looks = [
  { src: '/images/look-1.png', alt: 'Model in an off-white butterfly graphic tee leaning on a weathered wall', className: 'md:col-span-5 md:row-span-2 aspect-[3/4] md:aspect-auto', caption: 'LOOK 01 — KADJIADJI' },
  { src: '/images/look-2.png', alt: 'Model in a black sun graphic tee on a vintage scooter on a mountain road', className: 'md:col-span-7 aspect-[4/3]', caption: 'LOOK 02 — VULUNG / SUN' },
  { src: '/images/look-4.png', alt: 'Hands screen printing a snake graphic in the studio', className: 'md:col-span-3 aspect-square', caption: 'IN THE STUDIO' },
  { src: '/images/look-3.png', alt: 'Two friends in brown and cream logo tees walking past a retro storefront', className: 'md:col-span-4 aspect-[3/4] md:aspect-auto', caption: 'LOOK 03 — VL LOGO' },
]

export function Lookbook() {
  return (
    <section id="lookbook" className="mx-auto max-w-[1440px] scroll-mt-16 px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-medium tracking-[0.35em] text-burgundy">AUTUMN 2026</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">LOOKBOOK</h2>
        </div>
        <p className="font-serif text-xl italic text-muted-foreground">Shot on film in Pingtung & Kaohsiung.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[auto_auto] md:gap-6">
        {looks.map((look, i) => (
          <motion.figure
            key={look.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn('group relative overflow-hidden bg-secondary', look.className)}
          >
            <Image
              src={look.src || '/placeholder.svg'}
              alt={look.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
            <figcaption className="absolute bottom-3 left-3 bg-cream/90 px-3 py-1.5 text-[10px] font-medium tracking-[0.25em] text-ink">
              {look.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="border border-ink px-8 py-4 text-xs font-medium tracking-[0.25em] transition-colors duration-500 hover:bg-ink hover:text-cream"
        >
          FOLLOW ON INSTAGRAM →
        </a>
      </div>
    </section>
  )
}
