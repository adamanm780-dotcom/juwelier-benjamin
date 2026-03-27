import type { Metadata } from 'next'
import SubPageHeader    from '@/components/ui/SubPageHeader'
import LocationsSection from '@/components/sections/LocationsSection'

export const metadata: Metadata = {
  title: 'Standorte',
  description: 'Juwelier Benjamin in der Wiesbadener Altstadt – Langgasse 26. Besuchen Sie uns persönlich.',
}

export default function StandortePage() {
  return (
    <>
      <SubPageHeader
        overline="Wiesbaden Altstadt"
        title="Standorte"
        subtitle="Besuchen Sie uns persönlich — in der Langgasse 26 in der Wiesbadener Altstadt."
      />
      <LocationsSection />
    </>
  )
}
