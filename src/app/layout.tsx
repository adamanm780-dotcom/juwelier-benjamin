import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/layout/Providers'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style:  ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-jost',
  display:  'swap',
})

// Bubble background is client-only → dynamic import
const BubbleBackground = dynamic(
  () => import('@/components/ui/BubbleBackground'),
  { ssr: false }
)

export const metadata: Metadata = {
  title: {
    default:  'Juwelier Benjamin – Gold, Schmuck & Uhren seit 1965',
    template: '%s | Juwelier Benjamin',
  },
  description:
    'Familiengeführter Juwelier in Wiesbaden seit 1965. Goldankauf, Schmuck, Trauringe, Luxusuhren, Sonderanfertigungen und Reparaturen auf höchstem Niveau.',
  keywords: [
    'Juwelier Wiesbaden', 'Goldankauf Wiesbaden', 'Juwelier Langgasse',
    'Trauringe Wiesbaden', 'Schmuck Wiesbaden', 'Luxusuhren', 'Goldankauf',
    'Silberankauf', 'Sonderanfertigung Schmuck', 'Juwelier Benjamin',
  ],
  openGraph: {
    type: 'website', locale: 'de_DE', siteName: 'Juwelier Benjamin',
    title: 'Juwelier Benjamin – Gold, Schmuck & Uhren seit 1965',
    description: 'Familiengeführter Juwelier in Wiesbaden – Langgasse 26.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, themeColor: '#080808',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="bg-[#080808] text-cream overflow-x-hidden">
        {/* Fixed bubble background — läuft über alle Seiten durch */}
        <BubbleBackground />

        {/* Providers: CartContext + CartDrawer (client boundary) */}
        <Providers>
          {/* Sticky Header */}
          <Header />

          {/* Page Content — z-[1] stellt sicher dass Seiteninhalte über dem
              fixed Canvas (z-index:0) des BubbleBackground liegen */}
          <main className="relative z-[1]">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
