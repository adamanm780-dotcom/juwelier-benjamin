'use client'

export default function HeroSection() {


  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]"
      style={{ isolation: 'isolate' }}
      aria-label="Hero – Juwelier Benjamin"
    >
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

      <div className="relative z-[2] max-w-4xl mx-auto px-6 lg:px-10 w-full pt-36 pb-20 text-center">
        <div>
          {/* ── Text ─────────────────────────────────── */}
          <div>
            <p className="section-label mb-6">
              Seit 1965 · Juwelier & Goldschmied
            </p>

            <h1 className="font-cormorant font-light leading-[1.05] mb-7">
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-cream">
                Meisterhafte
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-gold-gradient">
                Juwelierkunst
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-cream">
                mit Tradition.
              </span>
            </h1>

            <p className="font-jost font-light text-[#999] text-base lg:text-lg leading-relaxed mb-10 max-w-md">
              Familiengeführt seit 1965. Drei Standorte in Wiesbaden und Mainz –
              für Schmuck, Uhren, Trauringe, Sonder&shy;anfertigungen und
              diskreten Goldankauf auf höchstem Niveau.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#kollektionen" className="btn-gold">
                Kollektionen entdecken
              </a>
              <a href="#goldankauf" className="btn-ghost">
                Goldankauf anfragen
              </a>
            </div>

            {/* Stat strip */}
            <div className="mt-12 flex gap-8 border-t border-[#1E1E1E] pt-8">
              {[
                { value: '1965', label: 'Handwerk seit'       },
                { value: '30+',  label: 'Jahre in Deutschland' },
                { value: '3',    label: 'Standorte'            },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-cormorant text-3xl text-gold font-semibold">{value}</p>
                  <p className="font-jost text-[0.65rem] text-[#666] tracking-wider uppercase mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-jost text-[0.6rem] tracking-widest uppercase text-[#555]">Entdecken</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent" />
      </div>
    </section>
  )
}
