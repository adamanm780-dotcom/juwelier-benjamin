'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { registerCollisionRect, unregisterCollisionRect } from '@/lib/collisionRects'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Autoplay nach Tab-Wechsel
  useEffect(() => {
    const v = videoRef.current; if (!v) return
    const onVisible = () => {
      if (!document.hidden && v.paused) v.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  // Video-Rect in Kollisions-Registry eintragen
  useEffect(() => {
    const v = videoRef.current; if (!v) return

    const update = () => {
      const r = v.getBoundingClientRect()
      registerCollisionRect('hero-video', { x: r.left, y: r.top, w: r.width, h: r.height })
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(v)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      unregisterCollisionRect('hero-video')
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero – Juwelier Benjamin"
    >
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

      <div className="relative z-[2] max-w-7xl mx-auto px-6 lg:px-10 w-full pt-36 pb-20">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 xl:gap-16 items-center">

          {/* ── Left: Text ─────────────────────────────────── */}
          <div>
            <motion.p
              className="section-label mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Seit 1965 · Juwelier & Goldschmied
            </motion.p>

            <motion.h1
              className="font-cormorant font-light leading-[1.05] mb-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-cream">
                Meisterhafte
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-gold-gradient">
                Juwelierkunst
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-cream">
                mit Tradition.
              </span>
            </motion.h1>

            <motion.p
              className="font-jost font-light text-[#999] text-base lg:text-lg leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              Familiengeführt seit 1965. In der Wiesbadener Altstadt –
              für Schmuck, Uhren, Trauringe, Sonder&shy;anfertigungen und
              diskreten Goldankauf auf höchstem Niveau.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.82 }}
            >
              <a href="/kollektionen" className="btn-gold">Kollektionen entdecken</a>
              <a href="/goldankauf" className="btn-ghost">Goldankauf anfragen</a>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              className="mt-12 flex gap-8 border-t border-[#1E1E1E] pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              {[
                { value: '1965', label: 'Handwerk seit'       },
                { value: '30+',  label: 'Jahre in Deutschland' },
                { value: '1',    label: 'Standort'             },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-cormorant text-3xl text-gold font-semibold">{value}</p>
                  <p className="font-jost text-[0.65rem] text-[#666] tracking-wider uppercase mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Video ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1564 / 1080' }}
            >
              <source src="/assets/video/hero.webm" type="video/webm" />
              <source src="/assets/video/hero.mp4"  type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-jost text-[0.6rem] tracking-widest uppercase text-[#555]">Entdecken</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent" />
      </motion.div>
    </section>
  )
}
