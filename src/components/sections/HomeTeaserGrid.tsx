'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const TEASERS = [
  {
    href: '/ueber-uns',
    overline: 'Seit 1965',
    title: 'Geschichte & Tradition',
    text: 'Von den Anfängen im Ausland bis zu den Filialen in Wiesbaden und Mainz — eine Familiengeschichte aus Leidenschaft für Gold und Handwerk.',
    cta: 'Unsere Geschichte',
  },
  {
    href: '/kollektionen',
    overline: 'Schmuck & Uhren',
    title: 'Kollektionen',
    text: 'Ringe, Ketten, Armbänder, Ohrringe — handgefertigt oder als Unikat. Dazu Luxusuhren neu und gebraucht, seriös bewertet.',
    cta: 'Kollektion entdecken',
  },
  {
    href: '/kollektionen#trauringe',
    overline: 'Für immer',
    title: 'Trauringe & Sonderanfertigungen',
    text: 'Individuelle Trauringe und Juwelen, gefertigt nach Ihren Wünschen — ausschließlich in Edelmaterialien, zeitlos und unverwechselbar.',
    cta: 'Mehr erfahren',
  },
  {
    href: '/goldankauf',
    overline: 'Faire Preise',
    title: 'Goldankauf',
    text: 'Wir kaufen Gold, Silber, Platin, Münzen und Luxusuhren — persönlich, diskret und zum tagesaktuellen Marktpreis.',
    cta: 'Jetzt verkaufen',
    highlight: true,
  },
  {
    href: '/reparaturen',
    overline: 'Eigene Werkstatt',
    title: 'Reparaturen',
    text: 'Aufpolieren, Löten, Gravieren, Steine fassen, Ringe weiten — professionell und mit Sorgfalt in unserer eigenen Werkstatt.',
    cta: 'Leistungen ansehen',
  },
  {
    href: '/standorte',
    overline: 'Wiesbaden & Mainz',
    title: 'Standorte',
    text: 'Besuchen Sie uns in der Wellritzstraße oder Langgasse in Wiesbaden, oder in der Lotharstraße in Mainz.',
    cta: 'Standorte finden',
  },
]

export default function HomeTeaserGrid() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="block font-jost text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4">
            Unsere Welt
          </span>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream">
            Alles aus einer Hand
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A84C]/10">
          {TEASERS.map((t, i) => (
            <motion.div
              key={t.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={t.href}
                className={`group flex flex-col h-full p-10 transition-all duration-400 ${
                  t.highlight
                    ? 'bg-[#1A1400]/90 hover:bg-[#1F1800]/90'
                    : 'bg-[#0D0D0D]/80 hover:bg-[#141414]/80'
                }`}
              >
                {/* Overline */}
                <span className="font-jost text-[0.55rem] tracking-[0.35em] uppercase text-gold mb-4 block">
                  {t.overline}
                </span>

                {/* Title */}
                <h3 className={`font-cormorant text-3xl font-light mb-4 leading-tight transition-colors duration-300 ${
                  t.highlight ? 'text-gold' : 'text-cream group-hover:text-gold'
                }`}>
                  {t.title}
                </h3>

                {/* Divider */}
                <div className="w-8 h-px bg-[#C9A84C]/40 mb-5 group-hover:w-16 transition-all duration-500" />

                {/* Text */}
                <p className="font-jost text-sm font-light text-[#888] leading-relaxed flex-1">
                  {t.text}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 mt-8 font-jost text-[0.65rem] tracking-[0.25em] uppercase text-gold">
                  <span>{t.cta}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
