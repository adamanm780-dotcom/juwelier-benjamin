'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const SUBJECTS = [
  'Goldankauf',
  'Schmuckberatung',
  'Trauringe & Sonderanfertigung',
  'Uhren',
  'Reparatur',
  'Allgemeine Anfrage',
]

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [subject, setSubject] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Hier Formular-Logik eintragen (z. B. API-Route, Resend, EmailJS etc.)
    // Beispiel: await fetch('/api/contact', { method: 'POST', body: formData })
    setSent(true)
  }

  return (
    <section id="kontakt" className="relative z-10 section-py bg-[#080808]/90">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-5">Kontakt & Beratung</p>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-light text-cream leading-[1.05] mb-6">
            Wir sind für Sie da.
          </h2>
          <p className="font-jost text-[#888] text-[0.95rem] max-w-xl mx-auto leading-relaxed">
            Ob Goldankauf, Beratungsgespräch oder Reparaturanfrage – sprechen Sie uns an.
            Persönlich, diskret, vertrauenswürdig.
          </p>
          <div className="gold-line mt-6 max-w-xs mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">

          {/* Left: contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Visit info */}
            <div className="luxury-card p-7">
              <div className="w-6 h-px bg-gold mb-5" />
              <h3 className="font-cormorant text-2xl text-cream font-light mb-5">Besuchen Sie uns</h3>

              <div className="space-y-5">
                {[
                  { city: 'Wiesbaden', street: 'Wellritzstr. 35',  zip: '65183', specialty: 'Schmuck · Uhren · Reparaturen' },
                  { city: 'Wiesbaden', street: 'Langgasse 26',     zip: '65183', specialty: 'Trauringe · Sonderanfertigungen · Goldankauf' },
                  { city: 'Mainz',     street: 'Lotharstr. 15',    zip: '55116', specialty: 'Goldankauf · Luxusuhren · Juwelen' },
                ].map(loc => (
                  <div key={loc.street} className="border-b border-[#1A1A1A] pb-5 last:border-0 last:pb-0">
                    <p className="font-jost text-[0.6rem] text-[#555] tracking-widest uppercase mb-1">{loc.city}</p>
                    <p className="font-cormorant text-lg text-cream font-light">{loc.street}, {loc.zip}</p>
                    <p className="font-jost text-xs text-[#666] mt-0.5">{loc.specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Goldankauf', sub: 'Jetzt anfragen', href: '#goldankauf' },
                { label: 'Standorte', sub: 'Route planen', href: '#standorte' },
              ].map(({ label, sub, href }) => (
                <a
                  key={label}
                  href={href}
                  className="luxury-card p-5 block hover:border-[#C9A84C]/35 transition-all duration-300 group"
                >
                  <p className="font-cormorant text-lg text-cream group-hover:text-gold transition-colors duration-300">{label}</p>
                  <p className="font-jost text-[0.65rem] text-[#666] mt-1 tracking-wide">{sub}</p>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {sent ? (
              <div className="luxury-card p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-6 animate-[pulse-gold_2s_ease-in-out_infinite]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-cormorant text-3xl text-cream font-light mb-3">Vielen Dank.</h3>
                <p className="font-jost text-sm text-[#888] leading-relaxed max-w-xs">
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns
                  schnellstmöglich bei Ihnen.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="luxury-card p-7 lg:p-8 space-y-5"
                noValidate
              >
                <h3 className="font-cormorant text-2xl text-cream font-light">Ihre Anfrage</h3>

                {/* Subject selector */}
                <div>
                  <label className="block font-jost text-[0.65rem] text-[#666] tracking-widest uppercase mb-2">
                    Anliegen *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSubject(s)}
                        className={`font-jost text-[0.65rem] tracking-wide px-3 py-1.5 border transition-all duration-200 ${
                          subject === s
                            ? 'bg-gold text-black border-gold'
                            : 'border-[#2A2A2A] text-[#777] hover:border-[#C9A84C]/40 hover:text-[#C9A84C]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'name',  label: 'Name *',          type: 'text',  placeholder: 'Ihr Name',            required: true  },
                    { id: 'email', label: 'E-Mail *',         type: 'email', placeholder: 'ihre@email.de',       required: true  },
                  ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block font-jost text-[0.65rem] text-[#666] tracking-widest uppercase mb-2">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full bg-[#111] border border-[#2A2A2A] focus:border-[#C9A84C]/50 px-4 py-3 font-jost text-sm text-cream placeholder-[#444] outline-none transition-colors duration-300 rounded-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-jost text-[0.65rem] text-[#666] tracking-widest uppercase mb-2">
                    Telefon (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+49 ..."
                    inputMode="tel"
                    className="w-full bg-[#111] border border-[#2A2A2A] focus:border-[#C9A84C]/50 px-4 py-3 font-jost text-sm text-cream placeholder-[#444] outline-none transition-colors duration-300 rounded-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-jost text-[0.65rem] text-[#666] tracking-widest uppercase mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    className="w-full bg-[#111] border border-[#2A2A2A] focus:border-[#C9A84C]/50 px-4 py-3 font-jost text-sm text-cream placeholder-[#444] outline-none transition-colors duration-300 rounded-none resize-none"
                  />
                </div>

                {/* Privacy note */}
                <p className="font-jost text-[0.65rem] text-[#444] leading-relaxed">
                  Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{' '}
                  <a href="/datenschutz" className="text-[#666] hover:text-gold underline underline-offset-2 transition-colors duration-200">
                    Datenschutzerklärung
                  </a>{' '}
                  zu.
                </p>

                <button type="submit" className="btn-gold w-full justify-center">
                  Anfrage senden
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
