import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'

export default function HashAppLayout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="dark"
    >
      <div className="min-h-screen bg-background">
        <nav className="flex items-center justify-center bg-background pt-4">
          <h1 className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-6xl font-black text-transparent">HASH</h1>
        </nav>
        {children}
      </div>
    </ThemeProvider>
  )
}