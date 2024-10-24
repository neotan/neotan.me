import { JetBrains_Mono, Montserrat } from 'next/font/google'

import { ViewTransitions } from 'next-view-transitions'

import type { Metadata } from 'next'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neo\'s Blog',
  description: 'A place to share my thoughts and ideas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script async src="https://cdn.splitbee.io/sb.js" />
          <script defer src="https://unpkg.com/tailwindcss-intersect@2.0.1/dist/observer.min.js" />
        </head>
        <body className={`${montserrat.className} antialiased`} >
          {children}
        </body>
      </html>
    </ViewTransitions >
  )
}
