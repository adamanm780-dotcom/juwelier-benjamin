'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ScrollFramePlayer = dynamic(
  () => import('@/components/ui/ScrollFramePlayer'),
  { ssr: false }
)

// 40 WebP-Frames (Megadigger, kein Transparenzhintergrund)
const REPAIR_FRAMES = Array.from({ length: 40 }, (_, i) =>
  `/assets/frames/megadigger/frame_${String(i + 1).padStart(3, '0')}.webp`
)

const SERVICES = [
  {
    title: 'Aufpolieren von Silberschmuck',
    desc: 'Ihr Silberschmuck erstrahlt wieder wie am ersten Tag – professionell und schonend aufpoliert.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round"/>
        <path d="M12 3c2.5 2 4 4 4 9" strokeLinecap="round"/>
        <path d="M18 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Gold & Silber reinigen',
    desc: 'Professionelle Reinigung und Politur für Gold- und Silberschmuck. Glanz ohne Materialverlust.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Löten – Gold & Silber',
    desc: 'Gebrochene oder gelöste Verbindungen fachgerecht gelötet. Saubere, dauerhafte Reparatur.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <path d="M10 20v-6m4 6v-6m-7-4V4h10v6H7z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10h14" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Ringe weiten oder verkleinern',
    desc: 'Perfekte Passform durch präzise Größenanpassung – ohne sichtbare Spuren, ohne Materialverlust.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <circle cx="12" cy="12" r="8" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" strokeLinecap="round"/>
        <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Gravurarbeiten',
    desc: 'Namen, Datum, Symbole – präzise graviert als unvergängliche Erinnerung in Ihr Schmuckstück.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Steine fassen',
    desc: 'Lose oder fehlende Edelsteine fachgerecht neu gefasst – von der Brillantfassung bis zum Cabochon.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Uhrenreparaturen',
    desc: 'Gehäuse, Glas, Armband oder Uhrwerk – wir reparieren Ihre Uhr mit der nötigen Sorgfalt.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 2h4M9 21.5v.5M15 21.5v.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function RepairsSection() {
  return (
    <section id="reparaturen" className="relative z-10 section-py bg-[#080808]/85">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header — 3 Spalten: Heading | Scroll-Animation | Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] items-center gap-8 mb-16">

          {/* Links: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-5">Reparaturen & Werkstatt</p>
            <h2 className="font-cormorant text-5xl sm:text-6xl font-light text-cream leading-[1.05]">
              Eigene Werkstatt.
              <br />
              <em className="text-gold-gradient not-italic">Echtes Handwerk.</em>
            </h2>
          </motion.div>

          {/* Mitte: 15-Frame Scroll-Animation (blauer Kreis-Bereich) */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ScrollFramePlayer
              frames={REPAIR_FRAMES}
              className="w-[260px] xl:w-[300px]"
              style={{ aspectRatio: '1080 / 1432' }}
              pxPerFrame={12}
            />
          </motion.div>

          {/* Mobile: Animation unter dem Heading, volle Breite */}
          <motion.div
            className="lg:hidden w-full max-w-[240px] mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ScrollFramePlayer
              frames={REPAIR_FRAMES}
              className="w-full"
              style={{ aspectRatio: '1080 / 1432' }}
              pxPerFrame={12}
            />
          </motion.div>

          {/* Rechts: In-House Badge */}
          <motion.div
            className="flex-shrink-0 border border-[#C9A84C]/30 px-7 py-5 bg-[rgba(201,168,76,0.04)]"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-jost text-[0.55rem] text-[#666] tracking-widest uppercase mb-1">Ausführung</p>
            <p className="font-cormorant text-2xl text-gold font-semibold">In-House</p>
            <p className="font-jost text-xs text-[#777] mt-1">Keine Weitergabe · Direkt beim Goldschmied</p>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="font-jost text-[#888] text-[0.95rem] leading-relaxed max-w-2xl mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Ihre Schmuckstücke und Uhren werden in unserer eigenen Werkstatt behandelt –
          nicht weitergegeben, nicht anonym bearbeitet. Jede Reparatur wird mit
          derselben Sorgfalt ausgeführt, die wir auch bei der Neuanfertigung walten lassen.
        </motion.p>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className="luxury-card p-6 group"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <div className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300 origin-left">
                {service.icon}
              </div>
              <h3 className="font-cormorant text-lg text-cream font-semibold mb-2 leading-tight">
                {service.title}
              </h3>
              <p className="font-jost text-xs text-[#777] leading-relaxed">{service.desc}</p>
              <div className="mt-4 w-0 group-hover:w-6 h-px bg-gold transition-all duration-400" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <a href="#kontakt" className="btn-gold">Reparatur anfragen</a>
          <p className="font-jost text-xs text-[#555]">
            Kostenlose Ersteinschätzung vor Ort – kein Auftrag ohne Ihre Zustimmung.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
