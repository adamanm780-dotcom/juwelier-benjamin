import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung – Juwelier Benjamin',
  robots: { index: false, follow: false },
}

// ─── DATENSCHUTZ – Anpassen ────────────────────────────────────────────────
// Ersetzen Sie [PLACEHOLDER]-Felder und prüfen Sie mit einem Datenschutzexperten.
// Diese Vorlage orientiert sich an DSGVO-Anforderungen, ersetzt jedoch keine
// Rechtsberatung.

export default function DatenschutzPage() {
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

      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-20">
        <p className="section-label mb-6">Rechtliches</p>
        <h1 className="font-cormorant text-5xl font-light text-cream mb-4">Datenschutzerklärung</h1>
        <div className="gold-line mb-12 max-w-[6rem]" />

        <div className="space-y-10 font-jost text-[#aaa] leading-relaxed text-sm">

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-medium text-[#ccc] mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">2. Verantwortlicher</h2>
            <p className="mb-2">Der Verantwortliche für die Datenverarbeitung auf dieser Website ist:</p>
            <div className="border border-[#1E1E1E] p-5 space-y-1">
              <p className="text-cream font-medium">Juwelier Benjamin</p>
              <p>[Name des Inhabers / Geschäftsführers]</p>        {/* ← ANPASSEN */}
              <p>[Straße und Hausnummer]</p>                        {/* ← ANPASSEN */}
              <p>[PLZ] [Stadt]</p>                                  {/* ← ANPASSEN */}
              <p>Telefon: [Telefonnummer]</p>                       {/* ← ANPASSEN */}
              <p>E-Mail: <a href="mailto:[email]" className="text-gold hover:underline underline-offset-4">[email@juwelier-benjamin.de]</a></p> {/* ← ANPASSEN */}
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">3. Datenerfassung auf dieser Website</h2>

            <h3 className="font-medium text-[#ccc] mb-2">Cookies</h3>
            <p className="mb-4">
              Diese Website verwendet keine analytischen Cookies. Es werden ausschließlich
              technisch notwendige Cookies verwendet, sofern dies für die Funktion der Seite
              erforderlich ist.
            </p>

            <h3 className="font-medium text-[#ccc] mb-2">Server-Log-Dateien</h3>
            <p className="mb-4">
              Der Provider der Website erhebt und speichert automatisch Informationen in
              sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
              Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer-URL, Hostname
              des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
            </p>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">4. Kontaktformular</h2>
            <p className="mb-3">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
              dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung / vorvertragliche
              Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
              Bearbeitung Ihrer Anfrage).
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">5. Ihre Rechte</h2>
            <p className="mb-3">Sie haben jederzeit das Recht auf:</p>
            <ul className="space-y-2 pl-4 list-none">
              {[
                'Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)',
                'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
                'Löschung Ihrer Daten (Art. 17 DSGVO)',
                'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                'Datenübertragbarkeit (Art. 20 DSGVO)',
                'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
                'Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)',
              ].map(right => (
                <li key={right} className="flex items-start gap-2">
                  <span className="text-gold text-[0.6rem] mt-1 flex-shrink-0">◆</span>
                  <span>{right}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">6. Google Fonts</h2>
            <p>
              Diese Website lädt Schriftarten über die Next.js Font Optimization direkt vom
              Google-Server. Dabei werden die Schriftdateien beim Build-Prozess heruntergeladen
              und lokal ausgeliefert – es findet im laufenden Betrieb kein Datentransfer zu
              Google-Servern statt. Weitere Informationen:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline underline-offset-4">
                Google Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">7. Externe Kartendienste</h2>
            <p>
              Auf den Standortseiten werden Links zu Google Maps eingesetzt. Beim Klick auf
              „In Karte" werden Sie zu Google Maps weitergeleitet, wo die Datenschutzbedingungen
              von Google gelten:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline underline-offset-4">
                https://policies.google.com/privacy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl text-cream font-light mb-4">8. Aktualität</h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand: März 2026.
              Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher
              bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung
              zu ändern.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-[#1A1A1A] pt-8 flex gap-4">
          <Link href="/" className="btn-ghost text-[0.65rem]">← Zurück</Link>
          <Link href="/impressum" className="btn-ghost text-[0.65rem]">Impressum</Link>
        </div>
      </main>
    </div>
  )
}
