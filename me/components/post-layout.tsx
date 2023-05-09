import Link from 'next/link'
import React, { ReactNode } from 'react'
import { TfiClose } from 'react-icons/tfi'
import { cn } from 'utils/helpers'
import Footer from './footer'
import MenuTabs from './menu-tabs'
import Navbar from './navbar'

export type PostLayoutProps = { className?: string, children: ReactNode }
export default function PostLayout({ className, children }: PostLayoutProps) {

  return (
    <div className={cn('mx-auto flex max-w-5xl flex-col gap-10 px-5 py-10 sm:flex-auto sm:px-10 sm:py-8', className)}    >
      <Navbar >
        <Link href='/blog' className='rounded-full bg-secondary/5 p-3 hover:bg-secondary/10'>
          <TfiClose className='h-6 w-6 fill-secondary hover:animate-spin-short' />
        </Link>
        <MenuTabs />
      </Navbar>
      {children}
      <Footer className='mt-8 space-y-4' />
    </div>
  )
}
