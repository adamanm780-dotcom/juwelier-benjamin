'use client'

import { useRef, useState, useCallback } from 'react'

interface Props {
  children:  React.ReactNode
  className?: string
  /** Millisekunden Cooldown zwischen zwei Auslösungen (default: 3500) */
  cooldown?: number
}

const RINGS          = 4
const RING_DELAY_MS  = 520   // Versatz zwischen Ringen
const ANIM_MS        = 1700  // Dauer einer einzelnen Ring-Animation

export default function RippleCard({ children, className = '', cooldown = 3500 }: Props) {
  const [key, setKey]       = useState(0)
  const [active, setActive] = useState(false)
  const lockedRef           = useRef(false)

  const trigger = useCallback(() => {
    if (lockedRef.current) return
    lockedRef.current = true

    setKey(k => k + 1)
    setActive(true)

    // Ringe nach vollständiger Animation aus dem DOM entfernen
    const clearDelay = RINGS * RING_DELAY_MS + ANIM_MS + 150
    setTimeout(() => setActive(false), clearDelay)

    // Cooldown zurücksetzen
    setTimeout(() => { lockedRef.current = false }, cooldown)
  }, [cooldown])

  return (
    <div className={`relative ${className}`} onMouseEnter={trigger}>
      {/* Ripple-Container: overflow:visible damit Wellen über den Kartenrand gehen */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ overflow: 'visible' }}
        aria-hidden
      >
        {active && Array.from({ length: RINGS }, (_, i) => (
          <span
            key={`${key}-${i}`}
            className="ripple-ring"
            style={{ animationDelay: `${i * RING_DELAY_MS}ms` }}
          />
        ))}
      </div>

      {/* Inhalt über den Ringen */}
      <div className="relative z-[1] h-full">
        {children}
      </div>
    </div>
  )
}
