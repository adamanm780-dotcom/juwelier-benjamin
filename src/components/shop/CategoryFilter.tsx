'use client'

import { type CategoryId, CATEGORY_LABELS } from '@/data/products'

// ─── Kategorie-Icons (SVG) ────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  alle: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
      <rect x="1" y="1" width="6" height="6" rx="0.5"/>
      <rect x="9" y="1" width="6" height="6" rx="0.5"/>
      <rect x="1" y="9" width="6" height="6" rx="0.5"/>
      <rect x="9" y="9" width="6" height="6" rx="0.5"/>
    </svg>
  ),
  ringe: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
      <circle cx="8" cy="8" r="5.5"/>
      <circle cx="8" cy="8" r="3"/>
    </svg>
  ),
  trauringe: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M8 13.5s-6-3.8-6-7.5a4 4 0 018 0 4 4 0 018 0c0 3.7-6 7.5-6 7.5z" strokeWidth="1.2"/>
    </svg>
  ),
  ohrringe: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
      <circle cx="5.5" cy="4" r="1.5"/>
      <path d="M5.5 5.5v4l1.5 2h-3l1.5-2"/>
      <circle cx="10.5" cy="4" r="1.5"/>
      <path d="M10.5 5.5v4l1.5 2h-3l1.5-2"/>
    </svg>
  ),
  anhaenger: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
      <path d="M8 2v2"/>
      <path d="M5 4h6"/>
      <polygon points="8,5 12,9 8,13 4,9"/>
    </svg>
  ),
  'armbänder': (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
      <path d="M3 5.5C3 4 5 3 8 3s5 1 5 2.5v5C13 12 11 13 8 13S3 12 3 10.5v-5z"/>
    </svg>
  ),
  halsketten: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
      <path d="M2 4c0 0 1.5-1 6-1s6 1 6 1"/>
      <path d="M2 4c.5 5 2.5 8 6 9 3.5-1 5.5-4 6-9"/>
      <circle cx="8" cy="12" r="1"/>
    </svg>
  ),
  uhren: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
      <circle cx="8" cy="8" r="5"/>
      <path d="M8 5v3l2 1.5"/>
    </svg>
  ),
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  activeCategory: CategoryId | 'alle'
  onChange:       (cat: CategoryId | 'alle') => void
  counts:         Partial<Record<CategoryId | 'alle', number>>
}

// ─── CategoryFilter ───────────────────────────────────────────────────────────

export default function CategoryFilter({ activeCategory, onChange, counts }: Props) {
  const all: Array<{ id: CategoryId | 'alle'; label: string }> = [
    { id: 'alle',      label: 'Alle'       },
    { id: 'ringe',     label: 'Ringe'      },
    { id: 'trauringe', label: 'Trauringe'  },
    { id: 'ohrringe',  label: 'Ohrringe'   },
    { id: 'anhaenger', label: 'Anhänger'   },
    { id: 'armbänder', label: 'Armbänder'  },
    { id: 'halsketten',label: 'Halsketten' },
    { id: 'uhren',     label: 'Uhren'      },
  ]

  return (
    <div className="relative">
      {/* Scroll-Fade rechts */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10 lg:hidden" />

      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
        role="tablist"
        aria-label="Produkt-Kategorien"
      >
        {all.map(({ id, label }) => {
          const active = id === activeCategory
          const count  = counts[id] ?? 0
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 font-jost text-[0.6rem] font-medium tracking-widest uppercase
                transition-all duration-250 border rounded-sm whitespace-nowrap
                ${active
                  ? 'bg-[#C9A84C] text-black border-[#C9A84C]'
                  : 'bg-transparent text-[#777] border-[#222] hover:text-[#C9A84C] hover:border-[#C9A84C]/30'
                }`}
            >
              <span className={active ? 'text-black' : ''}>
                {CATEGORY_ICONS[id]}
              </span>
              {label}
              <span className={`text-[0.5rem] tabular-nums ${active ? 'text-black/60' : 'text-[#555]'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
