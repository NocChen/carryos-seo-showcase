import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SlideOutCart } from '@/components/SlideOutCart'
import { LanguageProvider } from '@/components/LanguageProvider'

export const metadata: Metadata = {
  title: 'CARRYOS — Curated Tech EDC',
  description: 'Premium tech EDC gear. Power. Carry. Utility. Engineered.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-0 font-sans text-text-primary antialiased">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="pt-16">{children}</main>
            <Footer />
            <SlideOutCart />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
