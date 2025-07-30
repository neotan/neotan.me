import Link from 'next/link'

import { ThemeProvider } from '@/components/theme-provider'

export default function HashAppLayout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider attribute="class" forcedTheme='light' >
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </ThemeProvider>
  )
}