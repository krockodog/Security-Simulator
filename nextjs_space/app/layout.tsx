import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Course Begleiter - IT-Zertifizierung',
  description: 'Interaktive Prüfungsvorbereitung für CompTIA Security+, PenTest+, Network+, Linux+ und LPI Zertifizierungen mit realistischen PBQs und Examens-Simulationen',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Course Begleiter - IT-Zertifizierung',
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
        </ThemeProvider>
      </body>
    </html>
  )
}
