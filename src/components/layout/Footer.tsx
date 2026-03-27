import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  'Leistungen': [
    { label: 'Goldankauf',           href: '#goldankauf'   },
    { label: 'Schmuck & Juwelen',    href: '#kollektionen' },
    { label: 'Trauringe',            href: '#trauringe'    },
    { label: 'Uhren & Luxusuhren',   href: '#uhren'        },
    { label: 'Reparaturen',          href: '#reparaturen'  },
  ],
  'Standorte': [
    { label: 'Wiesbaden – Langgasse', href: '/standorte' },
  ],
  'Unternehmen': [
    { label: 'Geschichte',    href: '#ueber-uns'   },
    { label: 'Kontakt',       href: '#kontakt'     },
    { label: 'Impressum',     href: '/impressum'   },
    { label: 'Datenschutz',   href: '/datenschutz' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#050505] border-t border-[#1A1A1A]">
      {/* Gold top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/assets/images/wunderbaum.png"
                  alt="Juwelier Benjamin"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div>
                <span className="block font-cormorant text-xl font-light tracking-[0.12em] text-cream">
                  Juwelier Benjamin
                </span>
                <span className="block font-jost text-[0.55rem] tracking-[0.4em] uppercase text-[#666]">
                  Seit 1965
                </span>
              </div>
            </div>
            <p className="font-jost text-sm text-[#666] leading-relaxed max-w-xs">
              Familiengeführtes Juwelierhaus mit Tradition seit 1965. Gold, Silber, Juwelen,
              Trauringe und Uhren – höchste Qualität, persönliche Beratung.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-[#555] font-jost text-xs">
                <span className="text-gold">◆</span>
                <span>Familiengeführt seit 1965</span>
              </div>
              <div className="flex items-center gap-2 text-[#555] font-jost text-xs">
                <span className="text-gold">◆</span>
                <span>Wiesbaden Altstadt – Langgasse 26</span>
              </div>
              <div className="flex items-center gap-2 text-[#555] font-jost text-xs">
                <span className="text-gold">◆</span>
                <span>Eigene Werkstatt</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="section-label mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-jost text-sm text-[#666] hover:text-gold transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1A1A1A] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-jost text-xs text-[#444]">
            © {new Date().getFullYear()} Juwelier Benjamin. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/impressum"   className="font-jost text-xs text-[#444] hover:text-gold transition-colors duration-300">Impressum</Link>
            <Link href="/datenschutz" className="font-jost text-xs text-[#444] hover:text-gold transition-colors duration-300">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
