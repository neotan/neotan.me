'use client'
import { type ComponentPropsWithRef, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { FaLightbulb, FaRocket } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme-toggle'

export default function Navbar({ className, children }: ComponentPropsWithRef<'nav'>) {
  const [mounted, setMounted] = useState(false)
  const [currentSection, setCurrentSection] = useState<'products' | 'til' | null>(null)

  useEffect(() => setMounted(true), [])

  return (
    <nav className={cn('flex justify-center bg-background shadow-lg', className)}>
      <div className={cn(
        'container mx-auto flex h-16 items-center justify-between',
        'px-4 md:px-0 lg:px-8'
      )}>
        <Link href="/">
          <h1 className="sr-only">Neo Tan&apos;s Tech Blog</h1>
          <Image
            alt="Neo"
            className="hidden size-10 rounded-full md:block"
            height={40}
            src="/images/avatar.jpg"
            width={40}
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            asChild
            className={cn(
              'w-32 transition-opacity duration-300',
              mounted ? 'opacity-100' : 'opacity-0'
            )}
            variant={currentSection === 'products' ? 'default' : 'ghost'}
            onClick={() => setCurrentSection('products')}
          >
            <Link className="flex items-center gap-2" href="/#products">
              <FaRocket /> <span className="font-bold">Products</span>
            </Link>
          </Button>
          <Button
            asChild
            className={cn(
              'w-32 transition-opacity duration-300',
              mounted ? 'opacity-100' : 'opacity-0'
            )}
            variant={currentSection === 'til' ? 'default' : 'ghost'}
            onClick={() => setCurrentSection('til')}
          >
            <Link className="flex items-center gap-2" href="/#til">
              <FaLightbulb /><span className="font-bold">TIL</span>
            </Link>
          </Button>
        </div>
        <div className='size-7'>
          {mounted && (
            <ThemeToggle />
          )}
        </div>
      </div>
      {children}
    </nav>
  )
}