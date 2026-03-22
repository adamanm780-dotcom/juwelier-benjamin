'use client'

import { useEffect, useRef, useCallback } from 'react'
import { getCollisionRects, type CollisionRect } from '@/lib/collisionRects'

// ─── Bubble Physics System ────────────────────────────────────────────────
// Premium gold bubble background with real-time physics:
// - 3D-lit gold spheres (radial gradient lighting model)
// - Spring-based return-to-home animation
// - Smooth mouse repulsion field
// - Elastic bubble-bubble collisions
// - Mobile-optimized (reduced count, no mouse)

interface Bubble {
  x: number; y: number
  vx: number; vy: number
  r: number
  // Home position drifts slowly (organic float)
  homeX: number; homeY: number
  homeVx: number; homeVy: number
  phase: number    // phase offset for sine wave drift
  opacity: number
}

// Kreis-Rechteck-Kollision: Bubble prallt vom Rand des Rects ab
function collideBubbleRect(b: Bubble, rect: CollisionRect) {
  // Nächsten Punkt auf dem Rect zum Bubble-Mittelpunkt finden
  const cx = Math.max(rect.x, Math.min(b.x, rect.x + rect.w))
  const cy = Math.max(rect.y, Math.min(b.y, rect.y + rect.h))
  const dx = b.x - cx
  const dy = b.y - cy
  const dist = Math.sqrt(dx * dx + dy * dy)

  if (dist < b.r && dist > 0.01) {
    const nx = dx / dist
    const ny = dy / dist
    // Bubble herausschieben
    const overlap = b.r - dist
    b.x += nx * overlap
    b.y += ny * overlap
    // Geschwindigkeit spiegeln (mit leichter Dämpfung → weiches Abprallen)
    const dot = b.vx * nx + b.vy * ny
    if (dot < 0) {
      b.vx -= dot * nx * 1.5
      b.vy -= dot * ny * 1.5
    }
  }
}

const PHYSICS = {
  SPRING_K:         0.013,   // spring strength toward home
  DAMPING:          0.91,    // velocity decay
  HOME_DRIFT_SPEED: 0.006,   // how fast home position wanders
  MOUSE_ATTRACT:    3600,    // mouse pull power
  MOUSE_RADIUS:     280,     // effective mouse attraction radius (px)
  COLLISION_RESTITUTION: 0.38,
  BUBBLE_GAP:       3,       // min gap between bubble surfaces
}

function createBubbles(w: number, h: number, count: number): Bubble[] {
  return Array.from({ length: count }, () => {
    const r = Math.random() * 52 + 16
    const x = r + Math.random() * (w - r * 2)
    const y = r + Math.random() * (h - r * 2)
    return {
      x, y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r,
      homeX: x, homeY: y,
      homeVx: (Math.random() - 0.5) * 0.12,
      homeVy: (Math.random() - 0.5) * 0.08,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.55 + Math.random() * 0.35,
    }
  })
}

// 3D gold sphere rendering with layered radial gradients
function drawSphere(ctx: CanvasRenderingContext2D, b: Bubble) {
  const { x, y, r, opacity } = b

  // ── 1. Outer ambient glow ──────────────────────────────────
  const glow = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 1.9)
  glow.addColorStop(0,   `rgba(201, 168, 76, ${opacity * 0.11})`)
  glow.addColorStop(0.5, `rgba(180, 145, 50, ${opacity * 0.04})`)
  glow.addColorStop(1,   `rgba(201, 168, 76, 0)`)
  ctx.beginPath(); ctx.arc(x, y, r * 1.9, 0, Math.PI * 2)
  ctx.fillStyle = glow; ctx.fill()

  // ── 2. Main metallic body (light from upper-left ~10 o'clock) ──
  const lx = x - r * 0.32, ly = y - r * 0.32
  const body = ctx.createRadialGradient(lx, ly, r * 0.08, x + r * 0.12, y + r * 0.12, r * 1.1)
  body.addColorStop(0,    `rgba(255, 238, 160, ${opacity * 0.97})`)
  body.addColorStop(0.12, `rgba(235, 200, 110, ${opacity * 0.9})`)
  body.addColorStop(0.32, `rgba(201, 168, 76,  ${opacity * 0.82})`)
  body.addColorStop(0.58, `rgba(158, 120, 38,  ${opacity * 0.72})`)
  body.addColorStop(0.80, `rgba(100, 70,  15,  ${opacity * 0.58})`)
  body.addColorStop(1,    `rgba(45,  25,  3,   ${opacity * 0.35})`)
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = body; ctx.fill()

  // ── 3. Specular highlight ─────────────────────────────────────
  const spec = ctx.createRadialGradient(lx, ly, 0, lx, ly, r * 0.52)
  spec.addColorStop(0,   `rgba(255, 252, 220, ${opacity * 0.88})`)
  spec.addColorStop(0.35,`rgba(255, 245, 195, ${opacity * 0.32})`)
  spec.addColorStop(1,   `rgba(255, 245, 195, 0)`)
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = spec; ctx.fill()

  // ── 4. Rim light (lower-right counter-glow) ───────────────────
  const rx = x + r * 0.4, ry = y + r * 0.4
  const rim = ctx.createRadialGradient(rx, ry, 0, rx, ry, r * 0.38)
  rim.addColorStop(0,   `rgba(212, 175, 55, ${opacity * 0.28})`)
  rim.addColorStop(1,   `rgba(212, 175, 55, 0)`)
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = rim; ctx.fill()

  // ── 5. Subtle edge ring ───────────────────────────────────────
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(201, 168, 76, ${opacity * 0.28})`
  ctx.lineWidth = 0.6
  ctx.stroke()
}

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const bubblesRef = useRef<Bubble[]>([])
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)

  const resize = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 9 : 20
    bubblesRef.current = createBubbles(canvas.width, canvas.height, count)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true }); if (!ctx) return

    resize()

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove,  { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.007
      const t = timeRef.current
      const bubbles = bubblesRef.current
      const { x: mx, y: my } = mouse.current
      const W = canvas.width, H = canvas.height

      // ── Update home positions (organic drift) ─────────────
      for (const b of bubbles) {
        b.homeX += Math.sin(t * 0.55 + b.phase) * 0.22 + b.homeVx
        b.homeY += Math.cos(t * 0.40 + b.phase * 1.2) * 0.14 + b.homeVy

        // Soft boundary for home position
        const margin = b.r * 2
        if (b.homeX < margin || b.homeX > W - margin) b.homeVx *= -1
        if (b.homeY < margin || b.homeY > H - margin) b.homeVy *= -1
        b.homeX = Math.max(margin, Math.min(W - margin, b.homeX))
        b.homeY = Math.max(margin, Math.min(H - margin, b.homeY))
      }

      // ── Spring force & mouse attraction ───────────────────
      const mouseActive = mx > -9000
      for (const b of bubbles) {
        // Wenn Maus aktiv: Home-Feder stark dämpfen, damit die Kugeln
        // dem Cursor freier folgen können
        const springK = mouseActive ? PHYSICS.SPRING_K * 0.25 : PHYSICS.SPRING_K
        b.vx += (b.homeX - b.x) * springK
        b.vy += (b.homeY - b.y) * springK

        if (mouseActive) {
          // Richtung vom Bubble zum Cursor (Anziehung, nicht Abstoßung)
          const mdx = mx - b.x, mdy = my - b.y
          const md2 = mdx * mdx + mdy * mdy
          const rr  = PHYSICS.MOUSE_RADIUS + b.r
          if (md2 < rr * rr && md2 > 1) {
            const md    = Math.sqrt(md2)
            // Kraft nimmt mit Entfernung ab; nah am Cursor sanftere Anziehung
            const force = (PHYSICS.MOUSE_ATTRACT / (md2 + 120)) * (1 - md / rr) * 0.016
            b.vx += (mdx / md) * force
            b.vy += (mdy / md) * force
          }
        }
      }

      // ── Bubble–bubble elastic collision ───────────────────
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i], b = bubbles[j]
          const dx = b.x - a.x, dy = b.y - a.y
          const d2 = dx * dx + dy * dy
          const minD = a.r + b.r + PHYSICS.BUBBLE_GAP
          if (d2 < minD * minD && d2 > 0.01) {
            const d  = Math.sqrt(d2)
            const nx = dx / d, ny = dy / d
            const overlap = (minD - d) * 0.5
            a.x -= nx * overlap; a.y -= ny * overlap
            b.x += nx * overlap; b.y += ny * overlap
            const rv  = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny
            if (rv > 0) {
              const imp = rv * PHYSICS.COLLISION_RESTITUTION
              a.vx -= nx * imp; a.vy -= ny * imp
              b.vx += nx * imp; b.vy += ny * imp
            }
          }
        }
      }

      // ── Rechteck-Kollisionen (Video, Cards etc.) ──────────
      const collRects = getCollisionRects()
      if (collRects.length > 0) {
        for (const b of bubbles) {
          for (const rect of collRects) {
            collideBubbleRect(b, rect)
          }
        }
      }

      // ── Damping, integrate, boundary ─────────────────────
      for (const b of bubbles) {
        b.vx *= PHYSICS.DAMPING
        b.vy *= PHYSICS.DAMPING
        b.x  += b.vx
        b.y  += b.vy

        const m = b.r
        if (b.x < m)     { b.x = m;     b.vx =  Math.abs(b.vx) * 0.45 }
        if (b.x > W - m) { b.x = W - m; b.vx = -Math.abs(b.vx) * 0.45 }
        if (b.y < m)     { b.y = m;     b.vy =  Math.abs(b.vy) * 0.45 }
        if (b.y > H - m) { b.y = H - m; b.vy = -Math.abs(b.vy) * 0.45 }

        drawSphere(ctx, b)
      }

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [resize])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
