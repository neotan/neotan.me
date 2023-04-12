import '../styles/globals.css'
import { ComponentProps } from 'react'
import { cn } from '../utils/styles'

function RootLayout({ className, children }: ComponentProps<'html'>) {
  return (
    <html lang="en">
      <head />
      <body className={cn('antialiased', className)}>
        {children}
      </body>
    </html >
  )
}

export default RootLayout