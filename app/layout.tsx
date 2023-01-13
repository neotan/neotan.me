import './styles/globals.css'
import { twMerge } from 'tailwind-merge'
import { BaseProps } from 'shared-types'
import Footer from '@/components/footer'

function RootLayout({ className, children }: BaseProps<'html'>) {
  return (
    <html lang="en">
      <head />
      <body className={twMerge('antialiased', className)}>
        {children}
        <Footer />
      </body>
    </html >
  )
}

export default RootLayout