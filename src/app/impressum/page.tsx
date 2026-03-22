import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum – Juwelier Benjamin',
  robots: { index: false, follow: false },
}

// ─── PFLICHTANGABEN – hier ausfüllen ─────────────────────────────────────────
// Gemäß § 5 TMG und § 55 RStV sind folgende Pflichtangaben erforderlich.
// Ersetzen Sie alle [PLACEHOLDER]-Felder durch echte Unternehmensdaten.
// Empfehlung: Rechtsprüfung durch einen Rechtsanwalt vor Veröffentlichung.

const COMPANY = {
  name:         'Juwelier Benjamin',                      // ← Firmenname / Inhaber
  legalForm:    'Einzelunternehmen',                     // ← z. B. GmbH, Einzelunternehmen
  owner:        '[Vollständiger Name des Inhabers]',      // ← gesetzlicher Vertreter
  street:       '[Straße und Hausnummer]',               // ← Hauptgeschäftsadresse
  zip:          '[PLZ]',
  city:         '[Stadt]',
  country:      'Deutschland',
  phone:        '[Telefonnummer]',                        // ← Telefon mit Vorwahl
  email:        '[email@juwelier-benjamin.de]',           // ← E-Mail-Adresse
  taxId:        '[Umsatzsteuer-ID gemäß § 27a UStG]',    // ← USt-IdNr. (falls vorhanden)
  tradeRegister:'[Handelsregisternummer / Registergericht]', // ← falls eingetragen
  responsiblePerson: '[Name der inhaltlich Verantwortlichen, § 55 Abs. 2 RStV]',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-cream">
      {/* Minimal header */}
      <header className="border-b border-[#1A1A1A] px-6 lg:px-10 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <Image
              src="/assets/images/wunderbaum.png"
              alt="Juwelier Benjamin"
              fill className="object-contain"
              sizes="32px"
            />
          </div>
          <span className="font-cormorant text-lg font-light tracking-[0.1em] text-cream group-hover:text-gold transition-colors duration-300">
            Juwelier Benjamin
          </span>
        </Link>
        <Link href="/" className="font-jost text-[0.65rem] text-[#666] hover:text-gold transition-colors duration-300 tracking-widest uppercase">
          ← Zurück
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-20">
        <p className="section-label mb-6">Rechtliches</p>
        <h1 className="font-cormorant text-5xl font-light text-cream mb-4">Impressum</h1>
        <div className="gold-line mb-12 max-w-[6rem]" />

        <div className="space-y-10 font-jost text-[#aaa] leading-relaxed">

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-1 text-sm">
              <p className="text-cream font-medium">{COMPANY.name}</p>
              <p>{COMPANY.legalForm}</p>
              <p>{COMPANY.owner}</p>
              <p>{COMPANY.street}</p>
              <p>{COMPANY.zip} {COMPANY.city}</p>
              <p>{COMPANY.country}</p>
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">Kontakt</h2>
            <div className="space-y-1 text-sm">
              <p>Telefon: <span className="text-cream">{COMPANY.phone}</span></p>
              <p>E-Mail: <a href={`mailto:${COMPANY.email}`} className="text-gold hover:underline underline-offset-4">{COMPANY.email}</a></p>
            </div>
          </section>

          {COMPANY.taxId && (
            <section>
              <h2 className="font-cormorant text-2xl text-cream font-light mb-4">
                Umsatzsteuer-Identifikationsnummer
              </h2>
              <p className="text-sm">
                {COMPANY.taxId}
              </p>
            </section>
          )}

          {COMPANY.tradeRegister && (
            <section>
              <h2 className="font-cormorant text-2xl text-cream font-light mb-4">
                Handelsregister
              </h2>
              <p className="text-sm">{COMPANY.tradeRegister}</p>
            </section>
          )}

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-sm">{COMPANY.responsiblePerson}</p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">
              Streitschlichtung
            </h2>
            <p className="text-sm leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline underline-offset-4"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="text-sm leading-relaxed mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">
              Haftung für Inhalte
            </h2>
            <p className="text-sm leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">
              Haftung für Links
            </h2>
            <p className="text-sm leading-relaxed">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
              Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">
              Urheberrecht
            </h2>
            <p className="text-sm leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-[#1A1A1A] pt-8">
          <Link href="/" className="btn-ghost text-[0.65rem]">
            ← Zurück zur Startseite
          </Link>
        </div>
      </main>
    </div>
  )
}
