'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// 3D-Viewer und Chart client-only, lazy laden
const UmbroViewer = dynamic(() => import('@/components/ui/UmbroViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ height: 'clamp(220px, 30vw, 340px)' }}>
      <div className="flex gap-1.5">
        {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
      </div>
    </div>
  ),
})

const GoldPriceChart = dynamic(() => import('@/components/ui/GoldPriceChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <div className="flex gap-1.5">
        {[0,1,2].map(i => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  ),
})

const WHAT_WE_BUY = [
  { icon: '◆', label: 'Gold',              sub: 'Alle Legierungen 333–999' },
  { icon: '◆', label: 'Silber',            sub: 'Besteck, Schmuck, Barren' },
  { icon: '◆', label: 'Platin',            sub: 'Ringe, Ketten, Rohmaterial' },
  { icon: '◆', label: 'Münzen',            sub: 'Gold-, Silber- & Sammlermünzen' },
  { icon: '◆', label: 'Luxusuhren',        sub: 'Gebraucht & Vintage' },
  { icon: '◆', label: 'Schmuckstücke',     sub: 'Auch alt, beschädigt oder unvollständig' },
  { icon: '◆', label: 'Silberbesteck',     sub: 'Komplette Sets & Einzelteile' },
  { icon: '◆', label: 'Edelsteine',        sub: 'Brillanten, Rubine, Saphire & mehr' },
]

const TRUST_POINTS = [
  {
    title: 'Persönliche Bewertung',
    text: 'Insbesondere bei Münzen und Sammlerstücken ist eine korrekte Bewertung aus der Ferne schwierig. Besuchen Sie uns direkt – für eine fundierte, faire Einschätzung.',
  },
  {
    title: 'Diskret & Vertrauenswürdig',
    text: 'Seit über 30 Jahren in Deutschland. Ihre Wertgegenstände sind bei uns in vertrauenswürdigen Händen – von der Bewertung bis zur Auszahlung.',
  },
  {
    title: 'Faire Marktpreise',
    text: 'Wir orientieren uns am aktuellen Marktpreis und bewerten Zustand, Legierung, Gewicht, Sammlerwert und Edelsteine individuell.',
  },
]

export default function GoldankaufSection() {
  return (
    <section id="goldankauf" className="relative z-10 section-py">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1A1507_0%,transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[#080808]/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* Section header */}
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-5">Goldankauf & Edelmetalle</p>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-light text-cream leading-[1.05] mb-6">
            Gold verkaufen –
            <br />
            <em className="text-gold-gradient not-italic">mit Vertrauen.</em>
          </h2>
          <p className="font-jost text-[#999] text-[0.95rem] leading-relaxed">
            Viele Ankaufsstellen existieren – doch eine persönliche Bewertung durch den Händler Ihres
            Vertrauens ist oft deutlich vorteilhafter. Besonders bei Münzen, altem Schmuck oder
            Stücken mit Edelsteinen macht der Unterschied zwischen Schätzung und Expertise
            einen erheblichen Preisunterschied.
          </p>
        </motion.div>

        {/* Two-column: chart + what-we-buy */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 mb-16">

          {/* Chart block */}
          <motion.div
            className="luxury-card p-7 lg:p-8"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="section-label mb-1">Edelmetallpreise</p>
                <p className="font-jost text-xs text-[#555]">Gold & Silber · Live-Kurse</p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1A1507] border border-[#C9A84C]/20 px-3 py-1.5 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="font-jost text-[0.6rem] text-[#888] tracking-widest uppercase">Live</span>
              </div>
            </div>
            <GoldPriceChart />
          </motion.div>

          {/* What we buy */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="luxury-card p-7">
              <p className="section-label mb-5">Was wir ankaufen</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHAT_WE_BUY.map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3 group">
                    <span className="text-gold text-[0.6rem] mt-1 flex-shrink-0">{icon}</span>
                    <div>
                      <p className="font-jost text-sm text-cream font-medium">{label}</p>
                      <p className="font-jost text-[0.7rem] text-[#666]">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wiesbaden highlight */}
            <div className="p-6 bg-[rgba(201,168,76,0.06)] border border-[#C9A84C]/25 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
              <p className="section-label mb-3 text-gold">Goldankauf Wiesbaden</p>
              <p className="font-cormorant text-xl text-cream font-light mb-1">Juwelier Benjamin Altstadt</p>
              <p className="font-jost text-sm text-[#999] mb-4">Langgasse 26 · 65183 Wiesbaden</p>
              <p className="font-jost text-xs text-[#777] leading-relaxed mb-5">
                Goldankauf in der Wiesbadener Altstadt –
                professionelle Bewertung, faire Preise, diskreter Service.
              </p>
              <a href="/standorte" className="btn-ghost text-[0.6rem]">Standort anzeigen</a>
            </div>

            {/* ── 3D-Modell Umbro ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <UmbroViewer />
            </motion.div>

          </motion.div>
        </div>

        {/* Trust points */}
        <div className="grid sm:grid-cols-3 gap-5">
          {TRUST_POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              className="luxury-card p-7"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="w-6 h-px bg-gold mb-5" />
              <h3 className="font-cormorant text-xl text-cream font-semibold mb-3">{p.title}</h3>
              <p className="font-jost text-sm text-[#777] leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <a href="#kontakt" className="btn-gold mr-4">Goldankauf anfragen</a>
          <a href="#standorte" className="btn-ghost">Standort besuchen</a>
        </motion.div>
      </div>
    </section>
  )
}
