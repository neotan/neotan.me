import { ThemeProvider } from '@/components/theme-provider'

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {

  return (

    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
    >
      {children}
    </ThemeProvider>
  )
}