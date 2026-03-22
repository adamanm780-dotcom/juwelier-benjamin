'use client'

import { type CategoryId } from '@/data/products'

// ─── Kategorie-spezifische Gradient-Placeholder ───────────────────────────────
// Wird verwendet wenn kein echtes Produktbild vorhanden ist.
// Stellt die Produktkategorie durch Farbe und Symbol dar.

const CATEGORY_CONFIG: Record<CategoryId, {
  gradient: string
  symbol:   string
  accent:   string
}> = {
  ringe: {
    gradient: 'radial-gradient(ellipse at 40% 35%, #C9A84C18 0%, #0E0C08 55%, #080808 100%)',
    symbol:   '◯',
    accent:   '#C9A84C',
  },
  trauringe: {
    gradient: 'radial-gradient(ellipse at 55% 40%, #D4C5A920 0%, #0C0C0E 55%, #080808 100%)',
    symbol:   '♡',
    accent:   '#D4C5A9',
  },
  ohrringe: {
    gradient: 'radial-gradient(ellipse at 45% 30%, #C8C8D020 0%, #0A0A0E 55%, #080808 100%)',
    symbol:   '✦',
    accent:   '#C0C0C8',
  },
  anhaenger: {
    gradient: 'radial-gradient(ellipse at 50% 45%, #B89A4015 0%, #0E0C06 55%, #080808 100%)',
    symbol:   '◇',
    accent:   '#C9A84C',
  },
  'armbänder': {
    gradient: 'radial-gradient(ellipse at 35% 55%, #C8A08018 0%, #0E0A08 55%, #080808 100%)',
    symbol:   '⌒',
    accent:   '#C8A080',
  },
  halsketten: {
    gradient: 'radial-gradient(ellipse at 50% 35%, #C0C0C018 0%, #0A0A0C 55%, #080808 100%)',
    symbol:   '○',
    accent:   '#C8C8C8',
  },
  uhren: {
    gradient: 'radial-gradient(ellipse at 40% 60%, #88888818 0%, #0A0A0A 55%, #080808 100%)',
    symbol:   '◷',
    accent:   '#888',
  },
}

interface Props {
  category: CategoryId
  size?: 'sm' | 'md' | 'lg'
}

export function CategoryPlaceholder({ category, size = 'md' }: Props) {
  const cfg     = CATEGORY_CONFIG[category]
  const symSize = size === 'sm' ? 'text-3xl' : size === 'md' ? 'text-7xl' : 'text-9xl'

  return (
    <div
      className="absolute inset-0 flex items-center justify-center select-none"
      style={{ background: cfg.gradient }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${cfg.accent}08 1px, transparent 1px),
                            linear-gradient(90deg, ${cfg.accent}08 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Category symbol */}
      <span
        className={`${symSize} font-cormorant select-none relative z-10`}
        style={{ color: `${cfg.accent}25` }}
        aria-hidden="true"
      >
        {cfg.symbol}
      </span>

      {/* Subtle center glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="rounded-full"
          style={{
            width: size === 'sm' ? '40px' : '80px',
            height: size === 'sm' ? '40px' : '80px',
            background: `radial-gradient(circle, ${cfg.accent}12 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      </div>
    </div>
  )
}
