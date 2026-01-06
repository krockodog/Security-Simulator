import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { CookieConsent } from '@/components/cookie-consent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CompTIA - Zertifikation - Begleiter',
  description: 'Cyberpunk-Style Prüfungsvorbereitung für CompTIA Security+, PenTest+, Network+, Linux+ und LPI mit realistischen PBQs und Examens-Simulationen',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'CompTIA - Zertifikation - Begleiter',
    description: 'Interaktive Prüfungsvorbereitung für CompTIA Security+, PenTest+, Network+, Linux+ und LPI',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
