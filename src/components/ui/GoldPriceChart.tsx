'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import {
  goldPriceAdapter, silverPriceAdapter,
  goldAlloys, silverAlloys,
  calculateAlloyPrice,
  type GoldPricePoint, type Metal,
} from '@/data/goldPrices'

// ─── Farb-Themes ──────────────────────────────────────────────────────────────
const THEMES = {
  gold: {
    verkauf:    '#D4AF5B',
    ankauf:     '#8A6D14',
    gradVerkauf: 'gradGoldVerkauf',
    gradAnkauf:  'gradGoldAnkauf',
    stopVerkauf: '#D4AF5B',
    stopAnkauf:  '#8A6D14',
  },
  silver: {
    verkauf:    '#C0C0C0',
    ankauf:     '#7A7A7A',
    gradVerkauf: 'gradSilverVerkauf',
    gradAnkauf:  'gradSilverAnkauf',
    stopVerkauf: '#C0C0C0',
    stopAnkauf:  '#7A7A7A',
  },
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label, metal }: {
  active?:  boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?:   string
  metal:    Metal
}) {
  if (!active || !payload?.length) return null
  const dateStr = label
    ? new Date(label).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'short' })
    : ''
  const decimals = 2
  return (
    <div className="bg-[#1C1A14] border border-[#C9A84C]/30 px-4 py-3 shadow-xl rounded-sm min-w-[180px]">
      <p className="text-[#888] font-jost text-xs mb-2 border-b border-[#333] pb-2">{dateStr}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: entry.color }} />
            <span className="text-[#aaa] font-jost text-xs">
              {entry.name === 'verkauf' ? 'Verkauf' : 'Ankauf'}
            </span>
          </div>
          <span className="font-jost text-xs font-medium tabular-nums" style={{ color: entry.color }}>
            {entry.value.toFixed(decimals)} €
          </span>
        </div>
      ))}
    </div>
  )
}

function formatXAxis(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-DE', { weekday: 'short' })
}

// ─── Main Chart Component ─────────────────────────────────────────────────────
export default function GoldPriceChart() {
  const [metal, setMetal]               = useState<Metal>('gold')
  const [data, setData]                 = useState<GoldPricePoint[]>([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState<string | null>(null)
  const [currentPrice, setCurrentPrice] = useState<{ ankauf: number; verkauf: number } | null>(null)

  const load = useCallback(async (m: Metal) => {
    setLoading(true); setError(null)
    const adapter = m === 'gold' ? goldPriceAdapter : silverPriceAdapter
    try {
      const [history, current] = await Promise.all([
        adapter.fetchPriceHistory('7d'),
        adapter.fetchCurrentPrice(),
      ])
      setData(history)
      setCurrentPrice(current)
    } catch {
      setError('Preisdaten konnten nicht geladen werden.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(metal) }, [metal, load])

  const theme    = THEMES[metal]
  const alloys   = metal === 'gold' ? goldAlloys : silverAlloys
  const decimals = 2
  const unit     = metal === 'silver' ? '999 Feinsilber' : '999 Feingold'
  const xTicks   = data.map(d => d.date)

  return (
    <div className="space-y-6">

      {/* ── Header: aktuelle Preise + Metal-Selector ───────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {currentPrice && (
          <div className="flex gap-6">
            <div>
              <p className="section-label text-[0.6rem] text-[#666] mb-0.5">Ankauf</p>
              <p className="font-cormorant text-2xl font-semibold tabular-nums" style={{ color: theme.ankauf }}>
                {currentPrice.ankauf.toFixed(decimals)} <span className="text-base font-light text-[#888]">€/g</span>
              </p>
            </div>
            <div className="border-l border-[#2A2A2A] pl-6">
              <p className="section-label text-[0.6rem] text-[#666] mb-0.5">Verkauf</p>
              <p className="font-cormorant text-2xl font-semibold tabular-nums" style={{ color: theme.verkauf }}>
                {currentPrice.verkauf.toFixed(decimals)} <span className="text-base font-light text-[#888]">€/g</span>
              </p>
            </div>
          </div>
        )}

        {/* Metal Selector */}
        <div className="flex gap-1 bg-[#111] border border-[#222] p-1 rounded-sm self-start sm:self-auto">
          {([['gold', 'Gold'], ['silver', 'Silber']] as [Metal, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMetal(key)}
              className={`px-3 py-1.5 text-[0.65rem] font-jost font-medium tracking-widest uppercase transition-all duration-200 rounded-sm ${
                metal === key
                  ? 'bg-[#C9A84C] text-black'
                  : 'text-[#888] hover:text-[#C9A84C]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Unit label */}
      <p className="font-jost text-[0.6rem] text-[#444] tracking-widest uppercase -mt-3">
        EUR pro Gramm · {unit} · 7 Tage
      </p>

      {/* ── Chart ─────────────────────────────────────────── */}
      <div className="relative h-[240px] sm:h-[280px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#080808]/60 z-10">
            <div className="flex gap-1.5">
              {[0,1,2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-[#888] font-jost text-sm">
            {error}
          </div>
        )}
        {!error && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 0, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id={theme.gradVerkauf} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={theme.stopVerkauf} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={theme.stopVerkauf} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id={theme.gradAnkauf} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={theme.stopAnkauf} stopOpacity={0.22} />
                  <stop offset="95%" stopColor={theme.stopAnkauf} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 6" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="date"
                ticks={xTicks}
                tickFormatter={v => formatXAxis(v)}
                tick={{ fill: '#555', fontSize: 10, fontFamily: 'var(--font-jost)' }}
                axisLine={false} tickLine={false} dy={6}
              />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fill: '#555', fontSize: 10, fontFamily: 'var(--font-jost)' }}
                axisLine={false} tickLine={false}
                tickFormatter={v => `${v}€`}
              />
              <Tooltip
                content={<CustomTooltip metal={metal} />}
                cursor={{ stroke: 'rgba(201,168,76,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Legend
                iconSize={8} iconType="circle"
                formatter={v => (
                  <span className="font-jost text-xs text-[#888]">
                    {v === 'verkauf' ? 'Verkaufspreis' : 'Ankaufspreis'}
                  </span>
                )}
                wrapperStyle={{ paddingTop: '12px' }}
              />
              <Area
                type="monotone" dataKey="verkauf"
                stroke={theme.verkauf} strokeWidth={1.5}
                fill={`url(#${theme.gradVerkauf})`}
                dot={false} activeDot={{ r: 3, fill: theme.verkauf, strokeWidth: 0 }}
              />
              <Area
                type="monotone" dataKey="ankauf"
                stroke={theme.ankauf} strokeWidth={1.5}
                fill={`url(#${theme.gradAnkauf})`}
                dot={false} activeDot={{ r: 3, fill: theme.ankauf, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Legierungstabelle ─────────────────────────────── */}
      {currentPrice && (
        <div className="border-t border-[#1E1E1E] pt-6">
          <p className="section-label mb-4">
            {metal === 'gold' ? 'Legierungen – Orientierungspreise Ankauf' : 'Silberlegierungen – Orientierungspreise Ankauf'}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1E1E1E]">
                  {['Feinheit', 'Bezeichnung', metal === 'gold' ? 'Karat' : 'Art', '€/Gramm (ca.)'].map(h => (
                    <th key={h} className="text-left pb-2 pr-4 font-jost font-medium text-[#555] text-[0.65rem] tracking-widest uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alloys.map((alloy, i) => {
                  const price = calculateAlloyPrice(currentPrice.ankauf, alloy.purity)
                  return (
                    <tr
                      key={alloy.fineness}
                      className={`border-b border-[#111] transition-colors duration-200 hover:bg-[#1A1A14] ${i === 0 ? 'bg-[#1C1A14]/50' : ''}`}
                    >
                      <td className="py-2.5 pr-4 font-cormorant text-lg font-semibold" style={{ color: theme.verkauf }}>
                        {alloy.fineness}
                      </td>
                      <td className="py-2.5 pr-4 font-jost text-[#aaa] text-xs">{alloy.label}</td>
                      <td className="py-2.5 pr-4 font-jost text-[#666] text-xs">{alloy.karat}</td>
                      <td className="py-2.5 font-jost text-cream text-sm font-medium tabular-nums">
                        {price.toFixed(decimals)} €
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.65rem] font-jost text-[#444] leading-relaxed">
            * Orientierungswerte. Tatsächliche Preise nach persönlicher Bewertung vor Ort.
          </p>
        </div>
      )}
    </div>
  )
}
