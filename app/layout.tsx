import type { Metadata } from 'next'
import { Bodoni_Moda, Instrument_Sans } from 'next/font/google'
import './globals.css'

const serif = Bodoni_Moda({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })
const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Sobremesa', template: '%s | Sobremesa' },
  description: 'La guía gastronómica de alta gama en español.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
