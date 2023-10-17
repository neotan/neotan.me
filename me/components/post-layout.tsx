import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { cn } from 'utils/helpers'
import Footer from './footer'
import MenuTabs from './menu-tabs'
import Navbar from './navbar'

export type PostLayoutProps = { className?: string, children: ReactNode }
export default function PostLayout({ className, children }: PostLayoutProps) {
  const router = useRouter()
  return (
    <div className={cn('mx-auto flex max-w-5xl flex-col gap-10 px-5 py-10 sm:flex-auto sm:px-10 sm:py-8', className)}    >
      <Navbar >
        <button
          className='rounded-full bg-secondary/5 p-3 hover:bg-secondary/10'
          onClick={() => router.back()}
        >
          <FiArrowLeft className='h-6 w-6 stroke-secondary' />
        </button>
        <MenuTabs />
      </Navbar>
      {children}
      <Footer className='mt-8 space-y-4' />
    </div>
  )
}
