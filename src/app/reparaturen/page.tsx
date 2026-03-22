import type { Metadata } from 'next'
import SubPageHeader  from '@/components/ui/SubPageHeader'
import RepairsSection from '@/components/sections/RepairsSection'

export const metadata: Metadata = {
  title: 'Reparaturen',
  description: 'Schmuck- und Uhrenreparaturen in eigener Werkstatt — Aufpolieren, Löten, Gravieren, Steine fassen und mehr bei Juwelier Benjamin.',
}

export default function ReparaturenPage() {
  return (
    <>
      <SubPageHeader
        overline="Eigene Werkstatt"
        title="Reparaturen"
        subtitle="Professionelle Schmuck- und Uhrenreparaturen in unserer eigenen Werkstatt — mit Sorgfalt, Erfahrung und höchstem Qualitätsanspruch."
      />
      <RepairsSection />
    </>
  )
}
