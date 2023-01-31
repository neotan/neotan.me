'use client'
import { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { TfiClose } from 'react-icons/tfi'
import Navbar from '@/components/navbar'

export default function SlugLayout({ children }: ComponentPropsWithoutRef<'main'>) {

  return (
    <main className='mx-auto flex max-w-4xl flex-col gap-10 px-5 py-10 sm:flex-auto sm:px-10 sm:py-8'>
      <Navbar >
        <Link href='/blog' className='bg-secondary/5 hover:bg-secondary/10 rounded-full p-3'>
          <TfiClose className='h-6 w-6 hover:animate-spin-short' />
        </Link>
      </Navbar>
      {children}
    </main>
  )
}