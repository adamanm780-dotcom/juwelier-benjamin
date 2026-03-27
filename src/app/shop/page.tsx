'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { PRODUCTS, CATEGORY_LABELS, type CategoryId } from '@/data/products'
import ProductCard from '@/components/shop/ProductCard'
import CategoryFilter from '@/components/shop/CategoryFilter'

// ─── Sort-Optionen ────────────────────────────────────────────────────────────

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default',    label: 'Standard'          },
  { value: 'price-asc',  label: 'Preis aufsteigend' },
  { value: 'price-desc', label: 'Preis absteigend'  },
  { value: 'name',       label: 'Name A–Z'          },
]

// ─── Shop Page ────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'alle'>('alle')
  const [sort, setSort] = useState<SortKey>('default')
  const [search, setSearch] = useState('')

  // ── Kategorien-Anzahl ──────────────────────────────────────────────────────
  const counts = useMemo(() => {
    const c: Partial<Record<CategoryId | 'alle', number>> = { alle: PRODUCTS.length }
    for (const p of PRODUCTS) {
      c[p.category] = (c[p.category] ?? 0) + 1
    }
    return c
  }, [])

  // ── Gefilterte & sortierte Produkte ────────────────────────────────────────
  const products = useMemo(() => {
    let filtered = PRODUCTS
    if (activeCategory !== 'alle')
      filtered = filtered.filter(p => p.category === activeCategory)
    if (search.trim())
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    switch (sort) {
      case 'price-asc':  return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...filtered].sort((a, b) => b.price - a.price)
      case 'name':       return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'de'))
      default:           return filtered
    }
  }, [activeCategory, sort, search])

  return (
    <div className="bg-[#080808] min-h-screen">

      {/* ── Hero-Header ──────────────────────────────────────────────── */}
      <div
        className="relative pt-44 pb-16 px-6 text-center overflow-hidden"
        style={{ isolation: 'isolate' }}
      >
        {/* Decorative orb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '600px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="section-label mb-5">Juwelier Benjamin · Kollektion</p>
          <h1 className="font-cormorant font-light text-cream leading-[1.05] text-5xl sm:text-6xl xl:text-7xl mb-5">
            Schmuck &{' '}
            <em className="text-gold-gradient not-italic">Uhren</em>
          </h1>
          <p className="font-jost text-sm text-[#666] max-w-md mx-auto leading-relaxed">
            Handgefertigte Schmuckstücke, Luxusuhren und Trauringe –
            jedes Stück ein Meisterwerk mit Geschichte.
          </p>
        </motion.div>

        <div className="gold-line w-16 mx-auto mt-8" />
      </div>

      {/* ── Filter & Suche ───────────────────────────────────────────── */}
      <div className="sticky top-[60px] z-20 bg-[#080808]/95 backdrop-blur-md border-b border-[#1A1A1A] px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* Kategorie-Tabs */}
          <CategoryFilter
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            counts={counts}
          />

          {/* Suche + Sortierung */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

            {/* Suche */}
            <div className="relative w-full sm:w-72">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555] pointer-events-none">
                <circle cx="9" cy="9" r="5.5"/>
                <path d="M13.5 13.5l3 3" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Produkt suchen …"
                className="w-full bg-[#111] border border-[#222] text-cream font-jost text-xs pl-9 pr-4 py-2.5 placeholder-[#444] focus:outline-none focus:border-[#C9A84C]/40 transition-colors duration-200"
                aria-label="Produkte suchen"
              />
            </div>

            {/* Ergebniszahl + Sort */}
            <div className="flex items-center gap-4">
              <p className="font-jost text-[0.6rem] text-[#555] whitespace-nowrap">
                {products.length} {products.length === 1 ? 'Artikel' : 'Artikel'}
              </p>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="bg-[#111] border border-[#222] text-[#888] font-jost text-[0.6rem] tracking-widest uppercase px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors duration-200 cursor-pointer"
                aria-label="Sortierung"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Produkt-Grid ─────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">

        {products.length === 0 ? (
          /* Keine Ergebnisse */
          <div className="text-center py-24">
            <p className="font-cormorant text-3xl text-[#444] font-light mb-3">Keine Artikel gefunden</p>
            <p className="font-jost text-sm text-[#555]">
              Bitte ändern Sie Ihre Suche oder wählen Sie eine andere Kategorie.
            </p>
          </div>
        ) : (
          <motion.div
            key={`${activeCategory}-${sort}-${search}`}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden:  { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Kategorie-Hinweis */}
        {activeCategory !== 'alle' && products.length > 0 && (
          <motion.p
            className="text-center mt-16 font-jost text-xs text-[#444] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {CATEGORY_LABELS[activeCategory as CategoryId]} · {products.length} Stücke verfügbar ·{' '}
            <span className="text-[#666]">Keine Onlinebestellung — persönliche Beratung vor Ort oder telefonisch</span>
          </motion.p>
        )}

        {/* Beratungs-CTA */}
        <motion.div
          className="mt-20 p-8 lg:p-12 border border-[#1A1A1A] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="gold-line w-12 mx-auto mb-6" />
          <p className="section-label mb-4">Persönliche Beratung</p>
          <h2 className="font-cormorant text-3xl sm:text-4xl text-cream font-light mb-5 leading-tight">
            Nicht das Richtige gefunden?<br />
            <em className="text-gold-gradient not-italic">Wir fertigen es für Sie.</em>
          </h2>
          <p className="font-jost text-sm text-[#666] max-w-md mx-auto leading-relaxed mb-8">
            Sonderanfertigungen nach Ihren Wünschen – in Gold, Silber oder Platin.
            Besuchen Sie uns in der Wiesbadener Altstadt, Langgasse 26.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/kontakt" className="btn-gold">Termin vereinbaren</a>
            <a href="/standorte" className="btn-ghost">Standorte ansehen</a>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
