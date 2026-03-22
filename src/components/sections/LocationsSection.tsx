'use client'

import { motion } from 'framer-motion'
import { locations } from '@/data/locations'

export default function LocationsSection() {
  return (
    <section id="standorte" className="relative z-10 section-py">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#1A1507_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-5">Unsere Standorte</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-cormorant text-5xl sm:text-6xl font-light text-cream leading-[1.05]">
              Wiesbaden & Mainz –
              <br />
              <em className="text-gold-gradient not-italic">nah bei Ihnen.</em>
            </h2>
            <p className="font-jost text-sm text-[#777] max-w-xs leading-relaxed">
              Drei Adressen, eine Familie, ein Versprechen. Besuchen Sie uns
              persönlich für Beratung, Bewertung und Besichtigung.
            </p>
          </div>
        </motion.div>

        {/* Location cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {locations.map((loc, i) => (
            <motion.article
              key={loc.id}
              className={`relative overflow-hidden luxury-card group ${
                loc.goldankauf ? 'border-[#C9A84C]/25' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
            >
              {/* Top accent line for goldankauf locations */}
              {loc.goldankauf && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
              )}

              <div className="p-7 flex flex-col h-full min-h-[340px]">

                {/* City + goldankauf badge */}
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div>
                    <p className="section-label mb-0.5">{loc.city}</p>
                    <h3 className="font-cormorant text-2xl text-cream font-light leading-tight">
                      {loc.name}
                    </h3>
                  </div>
                  {loc.goldankauf && (
                    <span className="flex-shrink-0 bg-[rgba(201,168,76,0.12)] border border-[#C9A84C]/30 text-gold font-jost text-[0.55rem] tracking-widest uppercase px-2.5 py-1 mt-1">
                      Goldankauf
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="flex items-start gap-2.5 mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4 text-gold flex-shrink-0 mt-0.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round"/>
                    <circle cx="12" cy="10" r="3" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="font-jost text-sm text-cream">{loc.street}</p>
                    <p className="font-jost text-sm text-[#777]">{loc.zip} {loc.city}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="font-jost text-xs text-[#777] leading-relaxed mb-5 flex-1">
                  {loc.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {loc.specialty.map(s => (
                    <span key={s} className="font-jost text-[0.6rem] text-[#666] border border-[#222] px-2 py-0.5 tracking-wide">
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-[0.6rem] flex-1 justify-center"
                  >
                    In Karte
                  </a>
                  <a
                    href="#kontakt"
                    className={`text-[0.6rem] flex-1 justify-center ${
                      loc.goldankauf ? 'btn-gold' : 'btn-ghost'
                    }`}
                  >
                    Kontakt
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mainz Goldankauf highlight banner */}
        <motion.div
          className="mt-8 p-7 lg:p-8 border border-[#C9A84C]/25 bg-[rgba(201,168,76,0.04)] relative overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="section-label mb-2 text-gold">Goldankauf Mainz by Juwelier Benjamin</p>
              <p className="font-cormorant text-2xl text-cream font-light">
                Lotharstr. 15 · 55116 Mainz
              </p>
              <p className="font-jost text-sm text-[#888] mt-1">
                Spezialisiertes Kompetenzzentrum für Gold-, Silber- und Luxusuhr-Ankauf
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent('Lotharstraße 15, 55116 Mainz')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex-shrink-0"
            >
              Route planen
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
