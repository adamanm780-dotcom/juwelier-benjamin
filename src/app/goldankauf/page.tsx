import type { Metadata } from 'next'
import SubPageHeader    from '@/components/ui/SubPageHeader'
import GoldankaufSection from '@/components/sections/GoldankaufSection'

export const metadata: Metadata = {
  title: 'Goldankauf',
  description: 'Gold, Silber, Platin, Münzen und Luxusuhren verkaufen — faire Preise, persönliche Beratung vor Ort bei Juwelier Benjamin.',
}

export default function GoldankaufPage() {
  return (
    <>
      <SubPageHeader
        overline="Faire Bewertung"
        title="Goldankauf"
        subtitle="Wir kaufen Gold, Silber, Platin, Münzen und Luxusuhren — persönlich, diskret und zum tagesaktuellen Marktpreis. Besuchen Sie uns in einer unserer Filialen."
      />
      <GoldankaufSection />
    </>
  )
}
