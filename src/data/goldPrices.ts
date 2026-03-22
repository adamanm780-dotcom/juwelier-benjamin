export const USE_LIVE_DATA = true

export type Period = '7d' | '30d' | '1y'
export type Metal  = 'gold' | 'silver'

export interface GoldPricePoint {
  date:    string   // ISO: "YYYY-MM-DD"
  ankauf:  number   // EUR/Gramm
  verkauf: number   // EUR/Gramm
}

export interface Alloy {
  fineness: string
  karat:    string
  label:    string
  purity:   number
}

// ─── Legierungen ──────────────────────────────────────────────────────────────
export const goldAlloys: Alloy[] = [
  { fineness: '999', karat: '24 Karat',    label: 'Feingold',            purity: 0.999  },
  { fineness: '900', karat: '21.6 Karat',  label: 'Hochfeingold',        purity: 0.900  },
  { fineness: '750', karat: '18 Karat',    label: 'Gelbgold / Weißgold', purity: 0.750  },
  { fineness: '585', karat: '14 Karat',    label: 'Gelbgold',            purity: 0.585  },
  { fineness: '333', karat: '8 Karat',     label: 'Leichtgold',          purity: 0.333  },
]

export const silverAlloys: Alloy[] = [
  { fineness: '999', karat: 'Feinsilber',      label: 'Feinsilber',       purity: 0.999  },
  { fineness: '925', karat: 'Sterlingsilber',  label: 'Sterlingsilber',   purity: 0.925  },
  { fineness: '835', karat: 'Deutsches Silber', label: 'Tafelsilber',     purity: 0.835  },
  { fineness: '800', karat: 'Silber 800',      label: 'Altes Tafelsilber', purity: 0.800  },
]

// ─── Alloy Price Calculator ───────────────────────────────────────────────────
export function calculateAlloyPrice(
  baseAnkauf: number,
  purity:     number,
  margin  = 0.97,
): number {
  return +(baseAnkauf * purity * margin).toFixed(2)
}

// ─── Mock Data Generator ──────────────────────────────────────────────────────
// Generiert plausiblen Kursverlauf, der am Echtpreis endet.
function generateMockData(
  days:          number,
  anchorVerkauf: number,
  spread:        number,
  volatility:    number,
): GoldPricePoint[] {
  const result: GoldPricePoint[] = []
  for (let i = days; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const cycle   = Math.sin(i * 0.18) * 1.1 * volatility + Math.cos(i * 0.09) * 0.6 * volatility
    const noise   = (Math.random() - 0.5) * 0.45 * volatility
    const drift   = (i / days) * 1.8 * volatility
    const verkauf = +(anchorVerkauf - drift + cycle + noise).toFixed(3)
    result.push({
      date:    d.toISOString().split('T')[0],
      verkauf: Math.max(0, verkauf),
      ankauf:  Math.max(0, +(verkauf * (1 - spread)).toFixed(3)),
    })
  }
  return result
}

// ─── Mock Adapters (Fallback ohne API) ───────────────────────────────────────
const mockGoldAdapter = {
  async fetchCurrentPrice() {
    return { verkauf: 125.50, ankauf: 115.40 }
  },
  async fetchPriceHistory(period: Period) {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365
    return generateMockData(days, 125.50, 0.082, 1.0)
  },
}

const mockSilverAdapter = {
  async fetchCurrentPrice() {
    return { verkauf: 1.89, ankauf: 1.66 }
  },
  async fetchPriceHistory(period: Period) {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365
    return generateMockData(days, 1.89, 0.12, 1.6)
  },
}

// ─── Live Adapters ────────────────────────────────────────────────────────────
const GOLD_SPREAD   = 0.082  // ~8.2% unter Spot → Ankaufspreis Gold
const SILVER_SPREAD = 0.12   // ~12% unter Spot → Ankaufspreis Silber

const liveGoldAdapter = {
  async fetchCurrentPrice(): Promise<{ ankauf: number; verkauf: number }> {
    const res = await fetch('/api/goldprice', { cache: 'no-store' })
    if (!res.ok) throw new Error('goldprice API error')
    const { priceGram24k } = await res.json()
    return {
      verkauf: +priceGram24k.toFixed(2),
      ankauf:  +(priceGram24k * (1 - GOLD_SPREAD)).toFixed(2),
    }
  },
  async fetchPriceHistory(period: Period): Promise<GoldPricePoint[]> {
    const current = await this.fetchCurrentPrice()
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365
    return generateMockData(days, current.verkauf, GOLD_SPREAD, 1.0)
  },
}

const liveSilverAdapter = {
  async fetchCurrentPrice(): Promise<{ ankauf: number; verkauf: number }> {
    const res = await fetch('/api/silberprice', { cache: 'no-store' })
    if (!res.ok) throw new Error('silberprice API error')
    const { priceGram } = await res.json()
    return {
      verkauf: +priceGram.toFixed(2),
      ankauf:  +(priceGram * (1 - SILVER_SPREAD)).toFixed(2),
    }
  },
  async fetchPriceHistory(period: Period): Promise<GoldPricePoint[]> {
    const current = await this.fetchCurrentPrice()
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365
    return generateMockData(days, current.verkauf, SILVER_SPREAD, 1.6)
  },
}

// ─── Exported Adapters ────────────────────────────────────────────────────────
export const goldPriceAdapter   = USE_LIVE_DATA ? liveGoldAdapter   : mockGoldAdapter
export const silverPriceAdapter = USE_LIVE_DATA ? liveSilverAdapter : mockSilverAdapter
