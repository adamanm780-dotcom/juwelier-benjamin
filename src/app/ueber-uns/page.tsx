import type { Metadata } from 'next'
import SubPageHeader  from '@/components/ui/SubPageHeader'
import AboutSection   from '@/components/sections/AboutSection'
import TimelineSection from '@/components/sections/TimelineSection'

export const metadata: Metadata = {
  title: 'Geschichte & Tradition',
  description: 'Die Geschichte von Juwelier Benjamin — seit 1965 im Edelmetallhandwerk, seit 1995 in Wiesbaden.',
}

export default function UeberUnsPage() {
  return (
    <>
      <SubPageHeader
        overline="Seit 1965"
        title="Geschichte & Tradition"
        subtitle="Von den Anfängen im Ausland bis zur Filiale in der Wiesbadener Altstadt — eine Familiengeschichte aus Leidenschaft für Gold und Handwerk."
      />
      <AboutSection />
      <TimelineSection />
    </>
  )
}
