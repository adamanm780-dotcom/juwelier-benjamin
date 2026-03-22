'use client'

import { motion } from 'framer-motion'
import { timelineEntries } from '@/data/timeline'
import RippleCard from '@/components/ui/RippleCard'

export default function TimelineSection() {
  return (
    <section id="historie" className="relative z-10 section-py overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1A1507_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* Section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-4">Unsere Geschichte</p>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-light text-cream">
            Eine Tradition,{' '}
            <em className="text-gold-gradient not-italic">die verbindet</em>
          </h2>
          <div className="gold-line mt-6 max-w-xs mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical center line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/30 to-transparent -translate-x-1/2" />

          <div className="space-y-0">
            {timelineEntries.map((entry, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={entry.year}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.75, delay: i * 0.05 }}
                >
                  {/* Content card */}
                  <div className={`lg:w-[calc(50%-40px)] ${isLeft ? 'lg:pr-10' : 'lg:pl-10'} pb-12 lg:pb-16`}>
                    <RippleCard
                      className={`luxury-card p-7 lg:p-8 relative ${
                        entry.highlight ? 'border-[#C9A84C]/30 bg-[rgba(201,168,76,0.04)]' : ''
                      }`}
                    >
                      {entry.highlight && (
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
                      )}

                      {/* Year — mobile only */}
                      <p className="lg:hidden section-label mb-3">{entry.year}</p>

                      <h3 className="font-cormorant text-2xl sm:text-3xl text-cream font-light mb-4 leading-tight">
                        {entry.title}
                      </h3>
                      <p className="font-jost text-sm text-[#888] leading-relaxed mb-4">
                        {entry.content}
                      </p>

                      {entry.location && (
                        <div className="flex items-center gap-2 text-gold">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-3.5 h-3.5 flex-shrink-0">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round"/>
                            <circle cx="12" cy="10" r="3" strokeLinecap="round"/>
                          </svg>
                          <span className="font-jost text-xs tracking-wide">{entry.location}</span>
                        </div>
                      )}

                      {entry.detail && !entry.location && (
                        <p className="font-jost text-xs text-[#666] tracking-wide">{entry.detail}</p>
                      )}
                    </RippleCard>
                  </div>

                  {/* Center node — desktop only */}
                  <div className="hidden lg:flex flex-col items-center justify-center w-20 flex-shrink-0 relative z-10">
                    {/* Year bubble */}
                    <div
                      className={`bg-[#080808] border px-3 py-1.5 text-center ${
                        entry.highlight
                          ? 'border-[#C9A84C]/60 shadow-gold-sm'
                          : 'border-[#2A2A2A]'
                      }`}
                    >
                      <span className="font-cormorant text-gold text-xl font-semibold leading-none">
                        {entry.year}
                      </span>
                    </div>
                  </div>

                  {/* Spacer for alternating side */}
                  <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cormorant text-2xl text-[#777] font-light italic mb-6">
            „Mit Zuversicht in die Zukunft – verwurzelt in Tradition."
          </p>
          <div className="flex justify-center gap-4">
            <a href="#kontakt" className="btn-ghost">Persönliche Beratung</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
