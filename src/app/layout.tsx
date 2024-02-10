import { AppProviders } from '@/app/providers'
import Header from '@/components/navbar/Navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'TodoStreak',
  description: 'The Community For Makers To Build In Public',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <AppProviders>
          <Header />
          <SpeedInsights />
          <Toaster position="bottom-center" />
          {children}
          <Analytics />
        </AppProviders>
      </body>
    </html>
  )
}
