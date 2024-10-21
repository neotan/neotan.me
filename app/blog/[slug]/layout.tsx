import { ThemeProvider } from '@/components/theme-provider'

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}