'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="top" className="relative h-svh min-h-[600px] overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <Image
          src="/images/hero.png"
          alt="Two models wearing VL boxy graphic tees in a sunlit mountain village"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="grain absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/60" aria-hidden />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center text-cream"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 text-[11px] font-medium tracking-[0.4em]"
        >
          DROP 02 — AUTUMN 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3.5rem,13vw,11rem)] font-extrabold leading-[0.85] tracking-tight"
        >
          VISUAL LEGACY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-5 font-serif text-2xl italic md:text-4xl"
        >
          Made today. Tradition tomorrow.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-3 font-serif-tc text-sm tracking-[0.2em] text-cream/80 md:text-base"
        >
          將傳統帶入流行，看見排灣的美。
        </motion.p>
        <motion.a
          href="#new-drop"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 border border-cream px-8 py-4 text-xs font-medium tracking-[0.25em] transition-colors duration-500 hover:bg-cream hover:text-ink"
        >
          SHOP THE COLLECTION →
        </motion.a>
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-between px-5 text-[10px] tracking-[0.3em] text-cream/70 md:px-10">
        <span>KAOHSIUNG, TW</span>
        <span>EST. 2026</span>
      </div>
    </section>
  )
}
