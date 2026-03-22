'use client'

import { useState } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { type Product, formatPrice, CATEGORY_LABELS } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { CategoryPlaceholder } from '@/components/shop/CategoryPlaceholder'
import ProductCard from '@/components/shop/ProductCard'

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav className="flex items-center gap-2 font-jost text-[0.55rem] tracking-widest uppercase text-[#555]" aria-label="Breadcrumb">
      <Link href="/shop" className="hover:text-gold transition-colors duration-200">Shop</Link>
      <span>/</span>
      <span className="text-[#444]">{CATEGORY_LABELS[product.category]}</span>
      <span>/</span>
      <span className="text-[#666] truncate max-w-[200px]">{product.name}</span>
    </nav>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-gold flex-shrink-0">
      <path d="M3 8l3 3 7-7"/>
    </svg>
  )
}

// ─── ProductDetailClient ──────────────────────────────────────────────────────

interface Props {
  product: Product
  related: Product[]
}

export default function ProductDetailClient({ product, related }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded]  = useState(false)

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-[#080808] min-h-screen">

      {/* ── Top-Bar ──────────────────────────────────────────────────── */}
      <div className="border-b border-[#111] bg-[#080808] pt-28 pb-4 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Breadcrumb product={product} />
          <Link
            href="/shop"
            className="flex items-center gap-1.5 font-jost text-[0.55rem] tracking-widest uppercase text-[#555] hover:text-gold transition-colors duration-200"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M10 3L5 8l5 5"/>
            </svg>
            Zurück
          </Link>
        </div>
      </div>

      {/* ── Hauptinhalt ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ─ Bild ─────────────────────────────────────────────────── */}
          <motion.div
            className="relative overflow-hidden border border-[#1A1A1A]"
            style={{ aspectRatio: '4 / 5' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <CategoryPlaceholder category={product.category} size="lg" />
            {product.image && (
              <NextImage
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
            {product.badge && (
              <div className="absolute top-5 left-5 z-10">
                <span className={`font-jost text-[0.55rem] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 ${
                  product.badge === 'NEU'      ? 'bg-[#C9A84C] text-black' :
                  product.badge === 'SALE'     ? 'bg-red-900/80 text-red-200' :
                  'bg-[#1A1810] text-[#C9A84C] border border-[#C9A84C]/40'
                }`}>
                  {product.badge}
                </span>
              </div>
            )}
          </motion.div>

          {/* ─ Details ──────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <p className="section-label">{CATEGORY_LABELS[product.category]}</p>
              {product.subcategory && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#333]" />
                  <p className="font-jost text-[0.55rem] text-[#444] tracking-widest uppercase">{product.subcategory}</p>
                </>
              )}
            </div>

            <h1 className="font-cormorant text-4xl sm:text-5xl font-light text-cream leading-[1.05] mb-6">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <p className="font-cormorant text-4xl font-semibold text-gold tabular-nums">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && (
                <p className="font-jost text-sm text-[#555] line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>

            <div className="gold-line w-12 mb-8" />

            {(product.material || product.carat) && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                {product.material && (
                  <div>
                    <p className="font-jost text-[0.55rem] text-[#555] tracking-widest uppercase mb-1">Material</p>
                    <p className="font-jost text-sm text-[#aaa]">{product.material}</p>
                  </div>
                )}
                {product.carat && (
                  <div>
                    <p className="font-jost text-[0.55rem] text-[#555] tracking-widest uppercase mb-1">Diamant</p>
                    <p className="font-jost text-sm text-[#aaa]">{product.carat}</p>
                  </div>
                )}
              </div>
            )}

            <p className="font-jost text-sm text-[#888] leading-relaxed mb-8">{product.description}</p>

            {product.details && product.details.length > 0 && (
              <ul className="space-y-2.5 mb-8">
                {product.details.map(d => (
                  <li key={d} className="flex items-center gap-3">
                    <IconCheck />
                    <span className="font-jost text-xs text-[#888]">{d}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.available}
                className={`flex-1 py-4 font-jost text-[0.6rem] font-medium tracking-[0.2em] uppercase transition-all duration-300 ${
                  added
                    ? 'bg-[#1A2A1A] border border-green-700/50 text-green-400'
                    : product.available
                      ? 'btn-gold'
                      : 'opacity-30 cursor-not-allowed bg-[#1A1A1A] border border-[#333] text-[#555]'
                }`}
              >
                {added ? '✓ Hinzugefügt' : product.available ? 'In den Warenkorb' : 'Nicht verfügbar'}
              </button>
              <Link href="/kontakt"
                className="btn-ghost flex-1 text-center py-4 font-jost text-[0.6rem] font-medium tracking-[0.2em] uppercase">
                Anfrage stellen
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-[#1A1A1A] grid grid-cols-3 gap-4 text-center">
              {[
                { icon: '◈', title: 'Zertifiziert', sub: 'mit Echtheitszertifikat' },
                { icon: '◉', title: 'Handgefertigt', sub: 'in unserer Werkstatt' },
                { icon: '◊', title: 'Beratung', sub: 'persönlich vor Ort' },
              ].map(({ icon, title, sub }) => (
                <div key={title} className="flex flex-col items-center gap-1.5">
                  <span className="font-cormorant text-2xl text-gold/60" aria-hidden="true">{icon}</span>
                  <p className="font-jost text-[0.55rem] font-semibold tracking-widest uppercase text-[#888]">{title}</p>
                  <p className="font-jost text-[0.5rem] text-[#555] leading-tight">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Ähnliche Artikel ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-[#111] py-16 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-3">Aus der gleichen Kategorie</p>
                <h2 className="font-cormorant text-3xl sm:text-4xl font-light text-cream">Ähnliche Stücke</h2>
              </div>
              <Link href="/shop"
                className="hidden sm:flex items-center gap-2 font-jost text-[0.6rem] tracking-widest uppercase text-[#666] hover:text-gold transition-colors duration-200">
                Alle ansehen
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
