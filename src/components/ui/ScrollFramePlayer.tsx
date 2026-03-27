'use client'

import { useEffect, useRef } from 'react'
import React from 'react'

interface Props {
  frames:       string[]
  className?:   string
  style?:       React.CSSProperties
  pxPerFrame?:  number             // Scroll-Pixel pro Frame (default 15)
  blendMode?:   React.CSSProperties['mixBlendMode']  // z.B. 'screen' für Transparenz
}

export default function ScrollFramePlayer({
  frames,
  className = '',
  style,
  pxPerFrame = 15,
  blendMode,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || frames.length === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Canvas-Auflösung auf natürliche Frame-Größe setzen (wird per CSS skaliert)
    // Wir setzen die Größe erst wenn das erste Bild geladen ist
    let canvasSized = false

    // Alle Frames vorladen
    const preloaded: HTMLImageElement[] = frames.map(src => {
      const el = new window.Image()
      el.src = src
      return el
    })

    // Hilfsfunktion: Frame auf Canvas zeichnen
    function drawFrame(idx: number) {
      const img = preloaded[Math.max(0, Math.min(frames.length - 1, idx))]
      if (!img || !ctx || !canvas) return

      const draw = () => {
        if (!canvasSized && img.naturalWidth > 0) {
          canvas.width  = img.naturalWidth
          canvas.height = img.naturalHeight
          canvasSized = true
        }
        // Kein Hintergrund zeichnen → transparenter Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }

      if (img.complete && img.naturalWidth > 0) {
        draw()
      } else {
        img.addEventListener('load', draw, { once: true })
      }
    }

    // Erstes Frame sofort anzeigen
    drawFrame(0)

    let framePos    = 0
    let lastScrollY = window.scrollY
    let rafId       = 0

    function tick() {
      const scrollY = window.scrollY
      const dy      = scrollY - lastScrollY
      lastScrollY   = scrollY

      if (Math.abs(dy) > 0.1) {
        framePos = Math.max(0, Math.min(frames.length - 1, framePos + dy / pxPerFrame))
        drawFrame(Math.round(framePos))
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [frames, pxPerFrame])

  return (
    <div className={className} style={{ ...style }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ width: '100%', height: '100%', display: 'block', mixBlendMode: blendMode }}
      />
    </div>
  )
}
