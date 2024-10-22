import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import '@/app/globals.css'

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
    <ThemeProvider defaultTheme="dark" >
      {children}
    </ThemeProvider>
  )
}
