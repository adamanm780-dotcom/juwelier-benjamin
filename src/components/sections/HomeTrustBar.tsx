'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '1965', label: 'Gegründet' },
  { value: '30+', label: 'Jahre in Deutschland' },
  { value: '3', label: 'Standorte' },
  { value: '100%', label: 'Familiengeführt' },
]

export default function HomeTrustBar() {
  return (
    <section className="relative z-10 py-14 bg-[#0D0D0D]/80">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <span className="block font-cormorant text-4xl font-light text-gold tracking-wide">
              {s.value}
            </span>
            <span className="block font-jost text-[0.6rem] tracking-[0.3em] uppercase text-[#666] mt-1">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
