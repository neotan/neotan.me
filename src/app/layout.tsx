import '@/styles/globals.css'

import { Montserrat } from 'next/font/google'

import { type Metadata } from 'next'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neo\'s Blog',
  description: 'A place to share my thoughts and ideas',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className={`${montserrat.className}`} lang="en">
      <head>
        <script async src="https://cdn.splitbee.io/sb.js" />
      </head>
      <body className='antialiased' >
        {children}
      </body>
    </html>
  )
}
