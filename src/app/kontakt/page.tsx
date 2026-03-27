import type { Metadata } from 'next'
import SubPageHeader  from '@/components/ui/SubPageHeader'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Kontakt & Beratung',
  description: 'Kontaktieren Sie Juwelier Benjamin — Terminvereinbarung, Goldankauf-Anfrage oder persönliche Beratung in Wiesbaden, Langgasse 26.',
}

export default function KontaktPage() {
  return (
    <>
      <SubPageHeader
        overline="Persönliche Beratung"
        title="Kontakt"
        subtitle="Wir freuen uns auf Sie. Kommen Sie direkt in eine unserer Filialen oder vereinbaren Sie einen Beratungstermin."
      />
      <ContactSection />
    </>
  )
}
