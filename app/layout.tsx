import type { Metadata } from 'next'
import { Barlow_Condensed, Instrument_Serif, Noto_Serif_TC } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart-context'

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const notoSerifTC = Noto_Serif_TC({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif-tc',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VL — Visual Legacy',
  description: 'Made to Be Seen. Inspired by roots, crafted for the streets.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="zh-TW"
      className={`${barlowCondensed.variable} ${instrumentSerif.variable} ${notoSerifTC.variable}`}
    >
      <body className="bg-background text-foreground font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
