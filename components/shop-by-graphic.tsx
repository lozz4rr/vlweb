'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const graphics = [
  { name: 'HUMAN FIGURE', zh: '人形紋', image: '/images/graphic-human.png', note: 'Ancestors, raised hands' },
  { name: 'VULUNG', zh: '百步蛇', image: '/images/graphic-vulung.png', note: 'Guardian of the land' },
  { name: 'KADJIADJI', zh: '蝴蝶', image: '/images/graphic-kadjiadji.png', note: 'Lightness & beauty' },
  { name: 'SUN', zh: '太陽', image: '/images/graphic-sun.png', note: 'Where it all began' },
]

export function ShopByGraphic() {
  return (
    <section id="graphics" className="scroll-mt-16 bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl"
          >
            SHOP BY GRAPHIC
          </motion.h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every graphic carries meaning. Pick the story you want to wear.
            <span className="mt-1 block font-serif-tc">每一個圖騰，都是一段故事。</span>
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {graphics.map((g, i) => (
            <motion.li
              key={g.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#new-drop" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                  <Image
                    src={g.image || '/placeholder.svg'}
                    alt={`${g.name} graphic detail`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/30" aria-hidden />
                  <span className="absolute bottom-4 left-4 translate-y-2 text-[10px] font-medium tracking-[0.25em] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    EXPLORE →
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold tracking-wide md:text-2xl">{g.name}</h3>
                  <span className="font-serif-tc text-sm text-muted-foreground">{g.zh}</span>
                </div>
                <p className="font-serif text-base italic text-muted-foreground">{g.note}</p>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
