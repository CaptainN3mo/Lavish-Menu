import type { Metadata } from 'next'
import './globals.css'
import { StatusBanner } from '@/components/status-banner'

export const metadata: Metadata = {
  title: 'LAVISH SUITES BAR | RESTAURANT MENU',
  description: 'Experience luxury dining and premium beverages at Lavish Suites',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StatusBanner />
        {children}
      </body>
    </html>
  )
}
