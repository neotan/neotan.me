import { twMerge } from 'tailwind-merge'
import { BaseProps } from 'shared-types'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

function RootLayout({ className, children }: BaseProps<'html'>) {
  return (
    <html lang="en">
      <head />
      <body className={twMerge('flex h-screen flex-col', className)}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html >
  )
}

export default RootLayout