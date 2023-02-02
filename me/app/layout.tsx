'use client'
import '@/styles/globals.css'
import { useState } from 'react'
import { cn, isDevMode } from 'utils/helpers'
import { BaseProps } from 'shared-types'
import { JetBrains_Mono, Montserrat } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
import Footer from '@/components/footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrainsmono',
})

function RootLayout({ className, children }: BaseProps<'html'>) {

  return (
    <html lang="en" className={cn(montserrat.variable, jbMono.variable)}>
      <head />
      <body className={cn('antialiased', { 'debug-screens': isDevMode }, className)}>
        <ThemeProvider
          attribute="data-theme"
          storageKey={'neotan.me-root-theme'}
          defaultTheme='light'
        >
          <div className='mx-auto flex max-w-4xl flex-col gap-10 px-5 py-10 sm:flex-auto sm:px-10 sm:py-8'>

            {children}
          </div>
          <Footer className='mt-8 space-y-4' />
        </ThemeProvider>
      </body>
    </html >
  )
}

export default RootLayout