import type { Metadata } from 'next'
import SubPageHeader    from '@/components/ui/SubPageHeader'
import LocationsSection from '@/components/sections/LocationsSection'

export const metadata: Metadata = {
  title: 'Standorte',
  description: 'Juwelier Benjamin in Wiesbaden (Wellritzstraße, Langgasse) und Mainz (Lotharstraße). Besuchen Sie uns persönlich.',
}

export default function StandortePage() {
  return (
    <>
      <SubPageHeader
        overline="Wiesbaden & Mainz"
        title="Standorte"
        subtitle="Besuchen Sie uns persönlich — in der Wellritzstraße oder Langgasse in Wiesbaden, oder in der Lotharstraße in Mainz."
      />
      <LocationsSection />
    </>
  )
}
