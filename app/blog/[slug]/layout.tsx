import { ThemeProvider } from '@/components/theme-provider'

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}