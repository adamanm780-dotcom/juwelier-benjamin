'use client'

import { useEffect, useRef } from 'react'
import React from 'react'

interface Props {
  frames: string[]
  className?: string
  style?: React.CSSProperties
  /** Pixel of scroll distance per frame step (default: 15) */
  pxPerFrame?: number
}

export default function ScrollFramePlayer({
  frames,
  className = '',
  style,
  pxPerFrame = 15,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img || frames.length === 0) return

    // Alle Frames vorladen → Browser-Cache → sofortiger Wechsel ohne Flicker
    const preloaded = frames.map(src => {
      const el = new window.Image()
      el.src = src
      return el
    })

    img.src = frames[0]

    let framePos    = 0              // float 0 … frames.length-1
    let lastScrollY = window.scrollY
    let rafId       = 0

    function setFrame(pos: number) {
      const idx = Math.max(0, Math.min(frames.length - 1, Math.round(pos)))
      if (preloaded[idx]?.complete) {
        img!.src = frames[idx]
      } else {
        preloaded[idx]?.addEventListener('load', () => { img!.src = frames[idx] }, { once: true })
      }
    }

    function tick() {
      const scrollY = window.scrollY
      const dy      = scrollY - lastScrollY
      lastScrollY   = scrollY

      if (Math.abs(dy) > 0.1) {
        framePos = Math.max(0, Math.min(frames.length - 1, framePos + dy / pxPerFrame))
        setFrame(framePos)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [frames, pxPerFrame])

  return (
    <div className={className} style={{ ...style, background: '#080808' }}>
      <img
        ref={imgRef}
        src={frames[0]}
        alt=""
        loading="eager"
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain', display: 'block',
          background: 'transparent',
          // Verhindert weißen Flash zwischen Frames beim Laden
          imageRendering: 'auto',
        }}
      />
    </div>
  )
}
