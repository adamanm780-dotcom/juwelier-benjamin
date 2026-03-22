'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { type Product, formatPrice, CATEGORY_LABELS } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { CategoryPlaceholder } from '@/components/shop/CategoryPlaceholder'

// ─── Badge-Farben ─────────────────────────────────────────────────────────────

const BADGE_STYLES = {
  NEU:      'bg-[#C9A84C] text-black',
  SALE:     'bg-red-900/80 text-red-200',
  EXKLUSIV: 'bg-[#1A1810] text-[#C9A84C] border border-[#C9A84C]/40',
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()

  return (
    <article className="group relative overflow-hidden bg-[#0E0E0E] border border-[#1A1A1A] hover:border-[#C9A84C]/25 transition-colors duration-500 flex flex-col">

      {/* ── Bild-Bereich ─────────────────────────────────────────────── */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block overflow-hidden"
        style={{ aspectRatio: '4 / 5' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        {/* Gradient-Placeholder (immer sichtbar) */}
        <CategoryPlaceholder category={product.category} />

        {/* Echtes Bild (wenn vorhanden) */}
        {product.image && (
          <NextImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Hover-Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`font-jost text-[0.5rem] font-semibold tracking-[0.2em] uppercase px-2 py-1 ${BADGE_STYLES[product.badge]}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Nicht verfügbar */}
        {!product.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <span className="font-jost text-[0.6rem] tracking-widest uppercase text-[#666]">Ausverkauft</span>
          </div>
        )}
      </Link>

      {/* ── Goldene Trennlinie (bei Hover) ───────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/0 group-hover:via-[#C9A84C]/50 to-transparent transition-all duration-500" />

      {/* ── Inhalt ───────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Kategorie + Unterkategorie */}
        <div className="flex items-center gap-2">
          <span className="font-jost text-[0.5rem] text-[#555] tracking-widest uppercase">
            {CATEGORY_LABELS[product.category]}
          </span>
          {product.subcategory && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#333]" />
              <span className="font-jost text-[0.5rem] text-[#444] tracking-widest uppercase">
                {product.subcategory}
              </span>
            </>
          )}
        </div>

        {/* Name */}
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-cormorant text-[1.1rem] text-cream font-light leading-snug hover:text-gold transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Material / Karat */}
        {(product.material || product.carat) && (
          <p className="font-jost text-[0.55rem] text-[#555] tracking-wide">
            {[product.material, product.carat].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Preis + CTA */}
        <div className="flex items-end justify-between gap-3 mt-1">
          <div>
            <p className="font-cormorant text-xl font-semibold text-gold tabular-nums leading-none">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="font-jost text-[0.6rem] text-[#555] line-through mt-1 tabular-nums">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.available}
            className="flex-shrink-0 h-9 px-4 font-jost text-[0.55rem] font-medium tracking-widest uppercase border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={`${product.name} in den Warenkorb`}
          >
            + Warenkorb
          </button>
        </div>
      </div>

      {/* Goldene Linie unten (Hover) */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-[#C9A84C]/80 to-transparent transition-all duration-500" />
    </article>
  )
}
