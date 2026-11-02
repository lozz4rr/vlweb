'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    title: 'PAIWAN MOTIFS',
    zh: '排灣圖紋',
    body: 'Vulung, Kadjiadji, sun and human motifs — reinterpreted with respect.',
  },
  {
    title: 'MADE FOR TODAY',
    zh: '當代潮流',
    body: 'Bold graphics and a modern streetwear attitude.',
  },
]

export function OurStory() {
  return (
    <section id="story" className="scroll-mt-16 bg-[#4a1e1b] py-14 text-cream md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] text-[#d4af37]">OUR STORY</p>
          
          {/* 中文兩行標題加粗 (font-bold) */}
          <p className="mt-5 font-serif-tc text-3xl font-bold leading-relaxed tracking-[0.12em] md:text-5xl md:leading-relaxed">
            將傳統帶入流行，
            <br />
            看見排灣的美。
          </p>
          
          <p className="mx-auto mt-4 max-w-2xl font-serif text-xl italic leading-snug text-cream/85 md:text-2xl">
            VL reinterprets Paiwan graphics through retro streetwear, bringing tradition into everyday fashion.
          </p>
        </motion.div>

        {/* 下方改為居中的 2 欄排版 */}
        <ul className="mx-auto mt-12 grid max-w-3xl gap-px border-y border-cream/20 bg-cream/20 md:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="bg-[#4a1e1b] px-6 py-8 md:px-10"
            >
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-[#d4af37]">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-wide">{p.title}</h3>
              <p className="mt-1 font-serif-tc text-xs font-medium text-cream/70">{p.zh}</p>
              <p className="mt-3 text-xs leading-relaxed text-cream/80">{p.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
