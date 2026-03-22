import { NextResponse } from 'next/server'

// ─── In-Memory-Cache: 24 Stunden ─────────────────────────────────────────────
// Egal wie viele Besucher die Seite aufrufen – goldapi.io wird maximal 1x/Tag
// angefragt (pro Server-Instanz). Free-Tier: 100 Requests/Monat → entspannt.

let cache: { priceGram24k: number; fetchedAt: number } | null = null
const CACHE_TTL_MS = 24 * 60 * 60 * 1000  // 24 Stunden

export async function GET() {
  const now = Date.now()

  // Cache hit
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cache, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        'X-Cache': 'HIT',
      },
    })
  }

  // Cache miss → goldapi.io anfragen
  const key = process.env.GOLDAPI_KEY
  if (!key) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch('https://www.goldapi.io/api/XAU/EUR', {
      headers: {
        'x-access-token': key,
        'Content-Type': 'application/json',
      },
      // Auch Next.js fetch-Cache nutzen (doppelte Absicherung)
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      throw new Error(`goldapi.io responded with ${res.status}`)
    }

    const data = await res.json()
    const priceGram24k: number = data.price_gram_24k

    cache = { priceGram24k, fetchedAt: now }

    return NextResponse.json(cache, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        'X-Cache': 'MISS',
      },
    })
  } catch (err) {
    console.error('[goldprice] API error:', err)

    // Fallback: alten Cache-Wert zurückgeben, auch wenn abgelaufen
    if (cache) {
      return NextResponse.json(cache, { headers: { 'X-Cache': 'STALE' } })
    }

    return NextResponse.json({ error: 'Goldpreis nicht verfügbar' }, { status: 502 })
  }
}
