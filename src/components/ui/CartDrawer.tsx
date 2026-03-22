'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { formatPrice, CATEGORY_LABELS } from '@/data/products'
import { CategoryPlaceholder } from '@/components/shop/CategoryPlaceholder'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" className="w-5 h-5">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  )
}

function IconMinus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" className="w-3.5 h-3.5">
      <path d="M5 12h14"/>
    </svg>
  )
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" className="w-3.5 h-3.5">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  )
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
    </svg>
  )
}

function IconBag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[#333]">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}

// ─── CartDrawer ───────────────────────────────────────────────────────────────

export default function CartDrawer() {
  const { items, isOpen, subtotal, totalItems, closeCart, removeFromCart, updateQuantity } = useCart()

  // Body scroll sperren wenn Drawer offen
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC-Taste schließt Drawer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeCart])

  return (
    <>
      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ──────────────────────────────────────────────── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Warenkorb"
        className={`fixed top-0 right-0 h-full z-[61] w-full sm:w-[420px] bg-[#0C0C0C] border-l border-[#1E1E1E] flex flex-col
          transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* ─ Header ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1E1E]">
          <div>
            <h2 className="font-cormorant text-2xl font-light text-cream tracking-wide">
              Warenkorb
            </h2>
            {totalItems > 0 && (
              <p className="font-jost text-[0.6rem] text-[#666] tracking-widest uppercase mt-0.5">
                {totalItems} {totalItems === 1 ? 'Artikel' : 'Artikel'}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-gold transition-colors duration-200 rounded-sm hover:bg-[#1A1A1A]"
            aria-label="Warenkorb schließen"
          >
            <IconClose />
          </button>
        </div>

        {/* ─ Goldene Trennlinie ────────────────────────────────────────── */}
        <div className="h-px bg-gradient-to-r from-[#C9A84C]/40 via-[#C9A84C]/60 to-transparent" />

        {/* ─ Inhalt ───────────────────────────────────────────────────── */}
        {items.length === 0 ? (
          /* Leerer Warenkorb */
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
            <IconBag />
            <div>
              <p className="font-cormorant text-2xl font-light text-[#555] mb-2">
                Ihr Warenkorb ist leer
              </p>
              <p className="font-jost text-xs text-[#444] leading-relaxed max-w-[220px]">
                Entdecken Sie unsere Kollektionen und finden Sie Ihr perfektes Schmuckstück.
              </p>
            </div>
            <button
              onClick={closeCart}
              className="btn-gold text-[0.6rem] mt-2"
            >
              Kollektion entdecken
            </button>
          </div>
        ) : (
          /* Artikel-Liste */
          <ul className="flex-1 overflow-y-auto py-4 space-y-px">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="group px-5 py-4 hover:bg-[#111] transition-colors duration-200">
                <div className="flex gap-4 items-start">

                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border border-[#1E1E1E]">
                    <CategoryPlaceholder category={product.category} size="sm" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-jost text-[0.55rem] text-[#666] tracking-widest uppercase mb-0.5">
                      {CATEGORY_LABELS[product.category]}
                    </p>
                    <p className="font-cormorant text-base text-cream font-light leading-tight line-clamp-2 mb-2">
                      {product.name}
                    </p>
                    <p className="font-cormorant text-sm font-semibold text-gold tabular-nums">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  {/* Löschen (Desktop) */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-[#444] hover:text-red-400 transition-colors duration-200 mt-0.5 opacity-0 group-hover:opacity-100"
                    aria-label={`${product.name} entfernen`}
                  >
                    <IconTrash />
                  </button>
                </div>

                {/* Menge + Löschen */}
                <div className="flex items-center justify-between mt-3 pl-20">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center border border-[#2A2A2A] text-[#888] hover:text-gold hover:border-[#C9A84C]/40 transition-all duration-200 rounded-sm"
                      aria-label="Menge verringern"
                    >
                      <IconMinus />
                    </button>
                    <span className="font-jost text-sm text-cream w-6 text-center tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center border border-[#2A2A2A] text-[#888] hover:text-gold hover:border-[#C9A84C]/40 transition-all duration-200 rounded-sm"
                      aria-label="Menge erhöhen"
                    >
                      <IconPlus />
                    </button>
                  </div>

                  <p className="font-jost text-xs text-cream tabular-nums">
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* ─ Footer mit Summe + CTA ────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-[#1E1E1E] px-6 py-6 space-y-5 bg-[#0A0A0A]">
            {/* Zwischensumme */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-jost text-[0.6rem] text-[#666] tracking-widest uppercase">Zwischensumme</span>
                <span className="font-cormorant text-xl font-semibold text-gold tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="font-jost text-[0.55rem] text-[#444] leading-relaxed">
                Preise inkl. MwSt. · Endpreis nach persönlicher Beratung vor Ort.
              </p>
            </div>

            {/* Anfrage-CTA */}
            <div className="space-y-2.5">
              <Link
                href="/kontakt"
                onClick={closeCart}
                className="btn-gold w-full text-center text-[0.6rem] py-3.5"
              >
                Anfrage senden
              </Link>
              <button
                onClick={closeCart}
                className="btn-ghost w-full text-center text-[0.6rem] py-3"
              >
                Weiter einkaufen
              </button>
            </div>

            <p className="font-jost text-[0.55rem] text-[#444] text-center leading-relaxed">
              Juwelier Benjamin · Persönliche Beratung vor Ort oder telefonisch
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
