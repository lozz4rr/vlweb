'use client'

import { motion } from 'framer-motion'

const pillars = [
  { title: 'PAIWAN GRAPHICS', zh: '排灣圖騰', body: 'Vulung, Kadjiadji, the sun and the human figure — redrawn with respect.' },
  { title: 'RETRO LANGUAGE', zh: '復古美式', body: '70s American graphic tees, bold type and cracked ink.' },
  { title: 'SCREEN PRINTED', zh: '手工絹印', body: 'Small-batch, 1–2 color silkscreen printed in Kaohsiung.' },
]

export function OurStory() {
  return (
    <section id="story" className="scroll-mt-16 bg-burgundy py-24 text-cream md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-[11px] font-medium tracking-[0.35em] text-mustard">OUR STORY</p>
          <p className="mt-8 font-serif-tc text-3xl leading-relaxed tracking-[0.12em] md:text-5xl md:leading-relaxed">
            將傳統帶入流行，
            <br />
            看見排灣的美。
          </p>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-cream/85 md:text-3xl">
            VL reinterprets Paiwan graphics through retro streetwear, bringing tradition into everyday fashion.
          </p>
        </motion.div>

        <ul className="mt-20 grid gap-px border-y border-cream/20 bg-cream/20 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="bg-burgundy px-2 py-10 md:px-8"
            >
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-mustard">0{i + 1}</span>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-wide">{p.title}</h3>
              <p className="font-serif-tc text-sm text-cream/60">{p.zh}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/75">{p.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
