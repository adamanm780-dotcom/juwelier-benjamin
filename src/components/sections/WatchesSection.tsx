'use client'

import { motion } from 'framer-motion'

const WATCH_PILLARS = [
  {
    title: 'Luxusuhren',
    text: 'Renommierte Marken, gepflegte Exemplare und seltene Modelle – kuratiert und geprüft.',
  },
  {
    title: 'Ankauf',
    text: 'Sie möchten Ihre Luxusuhr verkaufen? Wir bewerten diskret und fair, direkt vor Ort.',
  },
  {
    title: 'Kommission',
    text: 'Seit 2010 nehmen wir auch Uhren in Kommission – für maximale Erlöschance bei minimalem Aufwand.',
  },
  {
    title: 'Aufbereitung',
    text: 'Gebrauchte Luxusuhren werden professionell aufbereitet und auf Qualität geprüft.',
  },
]

export default function WatchesSection() {
  return (
    <section id="uhren" className="relative z-10 section-py bg-[#080808]/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-5">Uhren & Luxusuhren</p>
            <h2 className="font-cormorant text-5xl sm:text-6xl font-light text-cream leading-[1.05]">
              Zeit als
              <br />
              <em className="text-gold-gradient not-italic">Meisterwerk</em>
            </h2>
          </motion.div>
          <motion.p
            className="font-jost text-[#888] text-[0.95rem] leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Bei Juwelier Benjamin finden Sie eine handverlesene Auswahl gepflegter Luxusuhren.
            Ob klassische Zeitmesser oder seltene Kollektionsstücke – Echtheit, Zustand und
            Wert stehen im Mittelpunkt jeder Bewertung.
          </motion.p>
        </div>

        {/* Main visual + pillars */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">

          {/* Decorative visual panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div
              className="relative overflow-hidden border border-[#1E1E1E]"
              style={{ aspectRatio: '16/10', background: 'linear-gradient(145deg, #0E0D0A 0%, #080806 100%)' }}
            >
              {/* Decorative clock face SVG */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="w-48 h-48 opacity-10" fill="none">
                  <circle cx="80" cy="80" r="72" stroke="#C9A84C" strokeWidth="2"/>
                  <circle cx="80" cy="80" r="66" stroke="#8A6D14" strokeWidth="0.5" strokeDasharray="3 5"/>
                  {/* Hour marks */}
                  {Array.from({ length: 12 }, (_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180)
                    const x1 = 80 + 60 * Math.cos(angle)
                    const y1 = 80 + 60 * Math.sin(angle)
                    const x2 = 80 + 68 * Math.cos(angle)
                    const y2 = 80 + 68 * Math.sin(angle)
                    return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`
                  }).join(' ') /* SSR-safe approach via string */}
                  <circle cx="80" cy="80" r="4" fill="#C9A84C"/>
                  {/* Hour hand */}
                  <line x1="80" y1="80" x2="80" y2="42" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round"/>
                  {/* Minute hand */}
                  <line x1="80" y1="80" x2="108" y2="80" stroke="#D4AF5B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06)_0%,transparent_65%)]" />

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#080808] to-transparent">
                <p className="font-jost text-[0.65rem] text-[#666] tracking-widest uppercase mb-1">Ankauf · Verkauf · Kommission</p>
                <p className="font-cormorant text-2xl text-cream font-light">
                  Faire Preise. Diskreter Service.
                </p>
              </div>
            </div>

            {/* Floating trust badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#0F0F0F] border border-[#C9A84C]/25 px-5 py-4 shadow-card">
              <p className="font-jost text-[0.55rem] text-[#666] tracking-widest uppercase mb-1">Bewertet & geprüft</p>
              <p className="font-cormorant text-gold text-lg font-semibold">Seit 2008</p>
            </div>
          </motion.div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {WATCH_PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                className="luxury-card p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <div className="w-5 h-px bg-gold mb-4" />
                <h3 className="font-cormorant text-xl text-cream font-semibold mb-2">{p.title}</h3>
                <p className="font-jost text-xs text-[#777] leading-relaxed">{p.text}</p>
              </motion.div>
            ))}

            <motion.div
              className="sm:col-span-2 lg:col-span-1 xl:col-span-2 p-6 bg-[rgba(201,168,76,0.04)] border border-[#C9A84C]/20"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-cormorant text-lg text-cream font-light italic mb-3">
                Haben Sie eine Luxusuhr zu verkaufen?
              </p>
              <p className="font-jost text-xs text-[#888] mb-4 leading-relaxed">
                Bringen Sie Ihre Uhr direkt zu einem unserer Standorte. Wir bewerten
                persönlich, fair und diskret – ohne Verpflichtung.
              </p>
              <a href="#kontakt" className="btn-ghost text-[0.6rem]">Termin anfragen</a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
