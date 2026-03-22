'use client'

import { motion } from 'framer-motion'

const FEATURES = [
  { title: 'Individuelle Beratung',   text: 'Wir nehmen uns Zeit für Ihren besonderen Moment. Keine Massenware, keine Eile.' },
  { title: 'Edelmaterialien',         text: 'Ausschließlich Gold, Platin und zertifizierte Edelsteine in höchster Qualität.' },
  { title: 'Maßanfertigung',          text: 'Perfekte Passform, perfektes Design. Auf Wunsch mit Gravur und individuellen Details.' },
  { title: 'Ensemble-Garantie',       text: 'Nach Jahren ergänzbar. Ein Ring von Juwelier Benjamin ist für die Ewigkeit gedacht.' },
]

export default function WeddingRingsSection() {
  return (
    <section id="trauringe" className="relative z-10 section-py">
      {/* Soft radial background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#1A1507_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="section-label mb-5">Trauringe & Sonderanfertigungen</p>
            <h2 className="font-cormorant text-5xl sm:text-6xl font-light text-cream leading-[1.05] mb-7">
              Geschaffen für
              <br />
              <em className="text-gold-gradient not-italic">den schönsten Tag</em>
            </h2>
            <p className="font-jost text-[#999] text-[0.95rem] leading-relaxed mb-6">
              Feinste Trauringe und Juwelen werden auf Kundenwunsch im Hause Benjamin
              weiterhin in Handarbeit gefertigt. Jedes Einzelstück entsteht ausschließlich
              in Edelmaterialien – und kann nach Jahren zu einem vollständigen
              Juwelen-Ensemble ergänzt werden.
            </p>
            <p className="font-jost text-[#999] text-[0.95rem] leading-relaxed mb-10">
              Sonderanfertigungen nach Ihren Skizzen, Entwürfen oder Inspirationen –
              wir begleiten Sie vom ersten Gespräch bis zur Übergabe Ihres einzigartigen
              Stückes.
            </p>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="p-5 border border-[#1E1E1E] hover:border-[#C9A84C]/25 transition-colors duration-400"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                >
                  <div className="w-4 h-px bg-gold mb-3" />
                  <h4 className="font-cormorant text-lg text-cream font-semibold mb-2">{f.title}</h4>
                  <p className="font-jost text-xs text-[#777] leading-relaxed">{f.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex gap-4">
              <a href="#kontakt" className="btn-gold">Beratungsgespräch</a>
              <a href="#standorte" className="btn-ghost">Standorte</a>
            </div>
          </motion.div>

          {/* Right: Decorative visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Visual composition – placeholder for wedding rings photography */}
            <div
              className="relative overflow-hidden border border-[#C9A84C]/15"
              style={{ aspectRatio: '3/4', background: 'linear-gradient(145deg, #111 0%, #0A0806 100%)' }}
            >
              {/* Decorative ring SVG placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-15" fill="none">
                  <circle cx="80"  cy="100" r="60" stroke="#C9A84C" strokeWidth="6"/>
                  <circle cx="120" cy="100" r="60" stroke="#C9A84C" strokeWidth="6"/>
                  <circle cx="80"  cy="100" r="48" stroke="#8A6D14" strokeWidth="1" strokeDasharray="4 6"/>
                  <circle cx="120" cy="100" r="48" stroke="#8A6D14" strokeWidth="1" strokeDasharray="4 6"/>
                </svg>
              </div>

              {/* Ambient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_60%)]" />

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#080808] to-transparent">
                <p className="font-cormorant text-3xl text-cream font-light italic">
                  „Für die Ewigkeit."
                </p>
                <p className="font-jost text-xs text-[#666] mt-2 tracking-widest uppercase">
                  Handgefertigt · Wiesbaden & Mainz
                </p>
              </div>
            </div>

            {/* Floating label */}
            <div className="absolute -top-4 -right-4 bg-[#0F0F0F] border border-[#C9A84C]/30 px-5 py-3 shadow-card">
              <p className="font-cormorant text-gold text-base font-semibold">Unikat</p>
              <p className="font-jost text-[0.6rem] text-[#777] tracking-widest uppercase">Sonderanfertigung</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
