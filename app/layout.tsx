import type { Metadata } from 'next'
import { JetBrains_Mono, Montserrat } from 'next/font/google'
import Footer from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'


const montserrat = Montserrat({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neo\'s Blog',
  description: 'A place for me to share my thoughts and ideas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://cdn.splitbee.io/sb.js" />
      </head>
      <body className={`${montserrat.className} antialiased`} >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Footer className='bg-transparent' />
      </body>
    </html>
  )
}
