import { ThemeProvider } from '@/components/theme-provider'

import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Neo Tan\'s Tech Blog',
  description: 'Full-stack engineer sharing insights on React, Next.js, TypeScript, AI, and software architecture. 18+ years of industry experience from IBM and Alibaba.',
  keywords: [
    'React',
    'Next.js',
    'TypeScript',
    'TailwindCSS Plugins',
    'VS Code Extensions',
    'Chrome Extensions',
    'AI',
    'GenAI',
    'LLM',
    'Software Architecture',
    'Full Stack Development'
  ],
  authors: [{ name: 'Neo Tan', url: 'https://neotan.me' }],
  creator: 'Neo Tan',
  metadataBase: new URL('https://neotan.me'),
  alternates: {
    canonical: 'https://neotan.me',
  },
  openGraph: {
    images: '/avatar.png',
    type: 'website',
    locale: 'en_CA',
    url: 'https://neotan.me',
    title: 'Neo Tan\'s Tech Blog',
    description: 'Full-stack engineer sharing insights on React, Next.js, TypeScript, AI, and software architecture.',
    siteName: 'Neo Tan\'s Tech Blog'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neo Tan\'s Tech Blog',
    description: 'Full-stack engineer sharing insights on React, Next.js, TypeScript, AI, and software architecture.'
  }
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
