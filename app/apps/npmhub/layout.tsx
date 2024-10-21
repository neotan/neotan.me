import { Mitr } from 'next/font/google'
import Link from 'next/link'
import React, { ComponentProps } from 'react'
import Footer from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import './styles.css'

const mitr = Mitr({
  subsets: ['latin'],
  weight: ['200', '500', '600', '700'],
})


export default function NpmHubAppLayout({ children, className }: ComponentProps<'div'>) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="pumpkin"
    >
      <div className={cn('h-full min-h-screen bg-background', className, mitr.className)} >
        <div className='container mx-auto flex h-full max-w-3xl flex-col gap-8'>
          <nav className="max-h-[72px] py-4">
            <Link href="/" className='mx-auto block w-fit' title='Home'>
              <h1 className="cursor-pointer text-5xl font-bold uppercase">
                <span className="text-accent">NPM</span>
                <span>HUB</span>
              </h1>
            </Link>
          </nav>
          {children}
          <Footer className='mx-auto text-zinc-700' />
        </div>
      </div>
    </ThemeProvider>
  )
}
