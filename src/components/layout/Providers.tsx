'use client'

import { type ReactNode } from 'react'
import { CartProvider } from '@/contexts/CartContext'
import CartDrawer from '@/components/ui/CartDrawer'

// ─── Providers ────────────────────────────────────────────────────────────────
// Client-Wrapper um den Cart-Context und den Cart-Drawer bereitzustellen.
// Wird in layout.tsx (Server-Komponente) eingebettet.

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  )
}
