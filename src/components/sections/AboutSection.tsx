'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '1965',  label: 'Handwerk seit'            },
  { value: '1995',  label: 'In Deutschland seit'       },
  { value: '3',     label: 'Standorte'                 },
  { value: '∞',     label: 'Qualitätsversprechen'      },
]

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Familienhandwerk',
    text:  'Drei Generationen Leidenschaft für Gold und Silber – verwurzelt im handwerklichen Erbe der Familie Benjamin.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Höchste Qualität',
    text:  'Ausschließlich Edelmaterialien. Jedes Einzelstück wird mit derselben Sorgfalt gefertigt wie seit jeher.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Persönliche Beratung',
    text:  'Anspruchsvolle Kundenwünsche verdienen individuelle Aufmerksamkeit. Kein Konzern – eine Familie, die zuhört.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Beständigkeit',
    text:  'Was einst bei Juwelier Benjamin gefertigt wird, kann nach Jahren ergänzt und veredelt werden. Bestand ohne Ablaufdatum.',
  },
]

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="relative z-10 section-py bg-[#080808]/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Top: editorial split ── */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">

          {/* Left: big quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="section-label mb-8">Über Juwelier Benjamin</p>
            <blockquote
              className="font-cormorant font-light italic text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.15] text-cream"
              style={{ lineHeight: 1.12 }}
            >
              <span className="text-gold-gradient not-italic font-medium">"</span>
              <br />
              Handwerk ist keine Fertigkeit,
              <br />
              es ist eine{' '}
              <em className="text-gold">Haltung.</em>
              <span className="text-gold not-italic">"</span>
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-8 h-px bg-gold" />
              <span className="font-jost text-sm text-[#777]">Familie Benjamin, seit 1965</span>
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-5"
          >
            <p className="font-jost text-[#aaa] leading-relaxed text-[0.95rem]">
              Die Familie Benjamin blickt auf mehr als sechs Jahrzehnte Erfahrung im Gold- und Silberhandwerk
              zurück. Was im Ausland begann, fand 1995 seinen festen Platz in Deutschland: Martin und Eduard
              Benjamin eröffneten in Wiesbaden die erste Filiale – mit dem Versprechen, anspruchsvolle
              Kundenwünsche auf höchstem Qualitätsniveau zu erfüllen.
            </p>
            <p className="font-jost text-[#aaa] leading-relaxed text-[0.95rem]">
              Seither ist Juwelier Benjamin in der Wiesbadener Altstadt verwurzelt – stets
              geführt von Familienangehörigen, stets mit derselben handwerklichen Sorgfalt. Unikatschmuck
              wird im Hause Benjamin weiterhin ausschließlich in Edelmaterialien gefertigt; jedes Stück
              kann nach Jahren zu einem vollständigen Ensemble ergänzt werden.
            </p>
            <p className="font-jost text-[#aaa] leading-relaxed text-[0.95rem]">
              Die Firmenphilosophie war von Anbeginn dieselbe: Qualität ohne Kompromiss, Beratung mit
              echtem Interesse, und ein Handwerk, das man sieht – in jedem Gramm Gold, in jeder
              geschliffenen Fassung.
            </p>
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1A1A] border border-[#1A1A1A] overflow-hidden mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="bg-[#0D0D0D] px-8 py-10 text-center">
              <p className="font-cormorant text-5xl text-gold font-semibold mb-2">{value}</p>
              <p className="font-jost text-[0.65rem] text-[#666] tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Pillars grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(({ icon, title, text }, i) => (
            <motion.div
              key={title}
              className="luxury-card p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="text-gold mb-5">{icon}</div>
              <h3 className="font-cormorant text-xl text-cream font-semibold mb-3">{title}</h3>
              <p className="font-jost text-[#777] text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
