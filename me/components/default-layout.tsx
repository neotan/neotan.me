import Image from 'next/image'
import React, { ReactNode } from 'react'
import { cn } from '../../../packages/utils/helpers'
import MenuTabs from '../components/menu-tabs'
import Footer from './footer'
import Navbar from './navbar'

export type DefaultLayoutProps = { className?: string, children: ReactNode }
export default function DefaultLayout({ className, children }: DefaultLayoutProps) {

  return (
    <div className={cn('mx-auto flex max-w-5xl flex-col gap-10 px-5 py-10 sm:flex-auto sm:px-10 sm:py-8', className)}
    >
      <Navbar className='px-0 sm:px-16' >
        <div className=''>
          <Image
            className='h-16 w-16 rounded-full shadow-3xl transition-transform hover:scale-150'
            alt='Avatar'
            src='/images/avatar.jpg'
            width={200}
            height={200}
          />
        </div>
        <MenuTabs />
      </Navbar>
      {children}
      <Footer className='mt-8 space-y-4' />
    </div>
  )
}
