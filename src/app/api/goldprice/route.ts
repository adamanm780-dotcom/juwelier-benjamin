import { NextResponse } from 'next/server'

// ─── edelmetalle.de → Goldpreis, kein API-Key nötig ──────────────────────────
// 24-Stunden-Cache → maximal ~30 Anfragen/Monat
// gold_eur ist in EUR/Troy-Oz → ÷ 31.1035 = EUR/Gramm

const TROY_OZ_TO_GRAM = 31.1035

let cache: { priceGram24k: number; fetchedAt: number } | null = null
const CACHE_TTL_MS = 24 * 60 * 60 * 1000

export async function GET() {
  const now = Date.now()

  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cache, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600', 'X-Cache': 'HIT' },
    })
  }

  try {
    const res = await fetch('https://api.edelmetalle.de/public.json', {
      next: { revalidate: 86400 },
    })
    if (!res.ok) throw new Error(`edelmetalle.de error: ${res.status}`)

    const data = await res.json()
    const priceGram24k = +(data.gold_eur / TROY_OZ_TO_GRAM).toFixed(4)

    cache = { priceGram24k, fetchedAt: now }

    return NextResponse.json(cache, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600', 'X-Cache': 'MISS' },
    })
  } catch (err) {
    console.error('[goldprice]', err)
    if (cache) return NextResponse.json(cache, { headers: { 'X-Cache': 'STALE' } })
    return NextResponse.json({ error: 'Goldpreis nicht verfügbar' }, { status: 502 })
  }
}
