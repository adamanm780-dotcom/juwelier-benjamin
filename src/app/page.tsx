import HeroSection from '@/components/sections/HeroSection'
import HomeTeaserGrid from '@/components/sections/HomeTeaserGrid'
import HomeTrustBar   from '@/components/sections/HomeTrustBar'

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="gold-line relative z-10" />
      <HomeTrustBar />
      <HomeTeaserGrid />
    </>
  )
}
