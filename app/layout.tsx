import './styles/globals.css'
import { twMerge } from 'tailwind-merge'
import { JetBrains_Mono, Mitr, Noto_Sans } from "@next/font/google";
import { BaseProps } from 'shared-types'
import Footer from '@/components/footer'

const mitr = Mitr({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700"]
})
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "100", "800"]
})

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