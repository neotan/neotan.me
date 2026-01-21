'use client'
import { type ComponentPropsWithRef, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { FaLightbulb, FaRocket } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar({ className, children }: ComponentPropsWithRef<'nav'>) {
  const [mounted, setMounted] = useState(false)
  const [currentSection, setCurrentSection] = useState<'products' | 'til' | null>(null)

  useEffect(() => setMounted(true), [])

  return (
    <nav className={cn(
      'flex justify-center',
      'bg-[#070707]/80 backdrop-blur-xl',
      'border-b border-[#323232]/50',
      className
    )}>
      <div className={cn(
        'container mx-auto flex h-16 max-w-6xl items-center justify-between',
        'px-4 md:px-6 lg:px-8'
      )}>
        {/* Logo */}
        <Link className="group flex items-center gap-3" href="/">
          <h1 className="sr-only">Neo Tan&apos;s Tech Blog</h1>
          <div className="relative">
            <Image
              alt="Neo"
              className={cn(
                'size-10 rounded-full',
                'ring-2 ring-[#323232] ring-offset-2 ring-offset-[#070707]',
                'transition-all duration-300',
                'group-hover:ring-primary/50'
              )}
              height={40}
              src="/images/avatar.jpg"
              width={40}
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            className={cn(
              'relative overflow-hidden px-4 py-2',
              'rounded-none border border-transparent',
              'fancy-underline font-medium tracking-wide hover:bg-transparent!',
              'transition-all duration-100',
              mounted ? 'opacity-100' : 'opacity-0',
              currentSection === 'products'
                ? 'text-primary-foreground'
                : 'text-muted-foreground'
            )}
            variant="ghost"
            onClick={() => setCurrentSection('products')}
          >
            <Link className="flex items-center gap-2" href="/#products">
              <FaRocket className="size-3.5" />
              <span>Products</span>
            </Link>
          </Button>

          <Button
            asChild
            className={cn(
              'relative overflow-hidden px-4 py-2',
              'rounded-none border border-transparent',
              'fancy-underline font-medium tracking-wide hover:bg-transparent!',
              'transition-all duration-100',
              mounted ? 'opacity-100' : 'opacity-0',
              currentSection === 'til'
                ? 'text-primary-foreground'
                : 'text-muted-foreground'
            )}
            variant="ghost"
            onClick={() => setCurrentSection('til')}
          >
            <Link className="flex items-center gap-2" href="/#til">
              <FaLightbulb className="size-3.5" />
              <span>TIL</span>
            </Link>
          </Button>
        </div>
      </div>
      {children}
    </nav>
  )
}
