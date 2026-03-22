'use client'

import { motion } from 'framer-motion'

const CATEGORIES = [
  {
    id: 'ringe',
    label: 'Ringe',
    title: 'Ringe & Juwelen',
    sub: 'Einzelstücke · Edelmetalle · Edelsteine',
    description: 'Vom schlichten Goldring bis zum mit Brillanten besetzten Einzelstück – handgefertigt in unserer Werkstatt, für Momente, die bleiben.',
    accent: 'col-span-1 row-span-2',
  },
  {
    id: 'ketten',
    label: 'Ketten',
    title: 'Halsketten',
    sub: 'Gold · Silber · Platin',
    description: 'Edle Ketten in verschiedenen Legierungen – klassisch oder zeitgemäß interpretiert.',
    accent: '',
  },
  {
    id: 'armbänder',
    label: 'Armbänder',
    title: 'Armbänder',
    sub: 'Armreifen · Armketten · Unikate',
    description: 'Jedes Armband erzählt eine Geschichte. Lassen Sie Ihres erzählen.',
    accent: '',
  },
  {
    id: 'ohrringe',
    label: 'Ohrringe',
    title: 'Ohrringe & Ohrstecker',
    sub: 'Brillanten · Perlen · Farbsteine',
    description: 'Von dezent bis dramatisch – für jede Silhouette die richtige Komposition.',
    accent: '',
  },
  {
    id: 'sonder',
    label: 'Sonderanfertigungen',
    title: 'Sonder\u00adfertigung',
    sub: 'Unikate nach Ihren Wünschen',
    description: 'Ihr Wunschstück, nach Maß gefertigt. Wir realisieren Entwürfe, die es sonst nirgends gibt.',
    accent: 'col-span-2',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function CollectionsSection() {
  return (
    <section id="kollektionen" className="relative z-10 section-py bg-[#080808]/85">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-4">Kollektionen</p>
            <h2 className="font-cormorant text-5xl sm:text-6xl font-light text-cream leading-[1.05]">
              Schmuck & <br />
              <em className="text-gold-gradient not-italic">Juwelierkunst</em>
            </h2>
          </motion.div>
          <motion.p
            className="font-jost text-sm text-[#777] max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Kein Standard, kein Konfektionsschmuck. Jedes Stück bei Juwelier Benjamin
            steht für handwerkliche Exzellenz und dauerhaften Wert.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {CATEGORIES.map((cat) => (
            <motion.article
              key={cat.id}
              variants={cardVariants}
              className={`group relative overflow-hidden luxury-card ${cat.accent}`}
              style={{ minHeight: cat.accent.includes('row-span-2') ? '440px' : '220px' }}
            >
              {/* Category label */}
              <div className="absolute top-5 right-5 z-10">
                <span className="section-label text-[0.55rem] text-[#555]">{cat.label}</span>
              </div>

              {/* Dark gradient background placeholder (replace with real imagery) */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.06) 0%, transparent 60%),
                               linear-gradient(145deg, #111 0%, #0A0A0A 100%)`,
                }}
              />

              {/* Decorative gold orb */}
              <div
                className="absolute opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  width: '200px', height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)',
                  right: '-40px', bottom: '-40px',
                  filter: 'blur(30px)',
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                <p className="font-jost text-[0.6rem] text-[#666] tracking-widest uppercase mb-2">{cat.sub}</p>
                <h3 className="font-cormorant text-2xl sm:text-3xl text-cream font-light mb-3 leading-tight">
                  {cat.title}
                </h3>
                <p className="font-jost text-sm text-[#888] leading-relaxed mb-5">{cat.description}</p>
                <a href="#kontakt" className="flex items-center gap-2 text-gold font-jost text-[0.65rem] tracking-widest uppercase group-hover:gap-3 transition-all duration-300">
                  Anfragen
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                    <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Bottom gold line on hover */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-500" />
            </motion.article>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          className="mt-8 text-center font-jost text-sm text-[#555]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Keine Onlinebestellung — persönliche Beratung vor Ort oder telefonisch.
          <a href="#kontakt" className="text-gold ml-2 hover:underline underline-offset-4 transition-all">
            Termin vereinbaren →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
