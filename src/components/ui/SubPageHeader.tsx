'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface SubPageHeaderProps {
  overline?: string
  title: string
  subtitle?: string
}

export default function SubPageHeader({ overline, title, subtitle }: SubPageHeaderProps) {
  return (
    <div className="relative z-[10] bg-[#080808] pt-44 pb-20 px-6 text-center" style={{ isolation: 'isolate' }}>
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-jost text-[0.6rem] tracking-[0.3em] uppercase text-[#555] hover:text-gold transition-colors duration-300"
        >
          <span>←</span>
          <span>Startseite</span>
        </Link>
      </motion.div>

      {/* Logo — klein, zentriert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="flex justify-center mb-8"
      >
        <div className="relative w-16 h-16">
          <Image
            src="/assets/images/wunderbaum.png"
            alt="Juwelier Benjamin"
            fill
            className="object-contain"
            sizes="64px"
            priority
          />
        </div>
      </motion.div>

      {overline && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="block font-jost text-[0.6rem] tracking-[0.45em] uppercase text-gold mb-5"
        >
          {overline}
        </motion.span>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="font-cormorant text-6xl md:text-7xl font-light text-cream leading-none"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 font-jost text-sm font-light text-[#777] max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent origin-center"
      />
    </div>
  )
}
