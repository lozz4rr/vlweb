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

          {/* 已改為思源宋體中文故事文案，並優化行距排版 */}
          <p className="mt-6 font-serif-tc text-sm md:text-base leading-relaxed tracking-wider text-cream/85">
            相傳，太陽在北大武山留下兩顆卵，由百步蛇守護，直到孕育出排灣族的始祖。百步蛇與太陽的故事，承載著族人對祖先的敬意，也連結著世代相傳的文化記憶。
          </p>
        </motion.div>
      </div>
    </section>
  )
}
