import type { Metadata } from 'next'
import SubPageHeader       from '@/components/ui/SubPageHeader'
import CollectionsSection  from '@/components/sections/CollectionsSection'
import WeddingRingsSection from '@/components/sections/WeddingRingsSection'
import WatchesSection      from '@/components/sections/WatchesSection'

export const metadata: Metadata = {
  title: 'Kollektionen',
  description: 'Schmuck, Trauringe, Sonderanfertigungen und Luxusuhren bei Juwelier Benjamin in Wiesbaden – Langgasse 26.',
}

export default function KollektionenPage() {
  return (
    <>
      <SubPageHeader
        overline="Schmuck & Uhren"
        title="Kollektionen"
        subtitle="Ringe, Ketten, Armbänder, Ohrringe und Luxusuhren — handgefertigt, kuratiert und auf höchstem Qualitätsniveau."
      />
      <CollectionsSection />
      <div className="gold-line relative z-10" />
      <WeddingRingsSection />
      <div className="gold-line relative z-10" />
      <WatchesSection />
    </>
  )
}
