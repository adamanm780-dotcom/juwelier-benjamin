'use client'

import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/ueber-uns',    label: 'Geschichte'    },
  { href: '/kollektionen', label: 'Kollektionen'  },
  { href: '/goldankauf',   label: 'Goldankauf'    },
  { href: '/reparaturen',  label: 'Reparaturen'   },
  { href: '/standorte',    label: 'Standorte'     },
  { href: '/kontakt',      label: 'Kontakt'       },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menü bei Routenwechsel schließen
  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080808]/92 backdrop-blur-md border-b border-[#C9A84C]/20 py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="relative flex items-center gap-3 group" aria-label="Juwelier Benjamin – Startseite">
            <div className="hidden sm:block">
              <span
                className="block font-cormorant text-2xl font-light tracking-[0.12em] text-cream group-hover:text-gold transition-colors duration-300"
                style={{ lineHeight: 1.1 }}
              >
                Juwelier Benjamin
              </span>
              <span className="block font-jost text-[0.55rem] tracking-[0.4em] uppercase text-[#888] mt-0.5">
                Seit 1965
              </span>
            </div>
            <span className="sm:hidden font-cormorant text-xl font-light tracking-[0.12em] text-cream group-hover:text-gold transition-colors duration-300">
              Juwelier Benjamin
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Hauptnavigation">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative font-jost text-[0.65rem] font-medium tracking-widest uppercase transition-colors duration-300 group ${
                    active ? 'text-gold' : 'text-[#999] hover:text-gold'
                  }`}
                >
                  {label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
            })}
            <Link href="/goldankauf" className="btn-gold text-[0.6rem] ml-2">
              Goldankauf
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-px bg-gold transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`block w-6 h-px bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-px bg-gold transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>

        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
        )}
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl flex flex-col justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute top-5 left-6 flex items-center gap-3">
          <div className="relative w-16 h-16">
            <NextImage src="/assets/images/wunderbaum.png" alt="Juwelier Benjamin" fill className="object-contain" sizes="64px" />
          </div>
          <span className="font-cormorant text-xl font-light tracking-[0.12em] text-cream">
            Juwelier Benjamin
          </span>
        </div>

        <nav className="px-8" aria-label="Mobile Navigation">
          <div className="gold-line mb-10 w-16" />
          <ul className="space-y-6">
            {NAV_LINKS.map(({ href, label }, i) => (
              <li key={href} style={{ animationDelay: `${i * 0.06}s` }}>
                <Link
                  href={href}
                  className={`font-cormorant text-4xl font-light block transition-colors duration-300 ${
                    pathname === href ? 'text-gold' : 'text-cream hover:text-gold'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="gold-line mt-10 mb-8 w-16" />
          <Link href="/goldankauf" className="btn-gold inline-flex">
            Goldankauf anfragen
          </Link>
        </nav>

        <div className="absolute bottom-12 right-8 flex gap-2">
          {[0,1,2].map(i => (
            <span key={i} className="w-1 h-1 rounded-full bg-gold opacity-40" />
          ))}
        </div>
      </div>
    </>
  )
}
