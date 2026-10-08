'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export function VulungBanner() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section
      ref={ref}
      id="vulung"
      className="relative flex min-h-[80svh] scroll-mt-16 items-center overflow-hidden bg-ink text-cream"
    >
      <motion.div className="absolute inset-[-12%_0]" style={{ y }}>
        <Image
          src="/images/vulung-banner.png"
          alt="Back of a black tee with a cracked screen-printed snake graphic, among slate stone houses"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="grain absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] text-mustard">THE STORY OF</p>
          <h2 className="mt-4 font-display text-7xl font-extrabold leading-[0.85] tracking-tight md:text-9xl">
            VULUNG
          </h2>
          <p className="mt-3 font-serif-tc text-xl tracking-[0.2em] text-cream/80">百步蛇</p>
          <p className="mt-8 font-serif text-2xl italic leading-snug md:text-3xl">
            Guardian of ancestors. Symbol of the land we come from.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
            In Paiwan culture, Vulung watches over the family and the land. We redraw its patterns with retro
            American graphic language — so the guardian travels with you, everyday.
          </p>
          <a
            href="#new-drop"
            className="mt-10 inline-block border border-cream px-8 py-4 text-xs font-medium tracking-[0.25em] transition-colors duration-500 hover:bg-cream hover:text-ink"
          >
            SHOP VULUNG COLLECTION →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
