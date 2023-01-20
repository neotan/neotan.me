import '../styles/globals.css'
import { BaseProps } from 'shared-types'
import { cn } from '../utils/styles'

function RootLayout({ className, children }: BaseProps<'html'>) {
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