'use client'
import { Link } from 'next-view-transitions'
import { ComponentPropsWithRef, useEffect, useState } from 'react'
import { FaLightbulb, FaRocket } from 'react-icons/fa'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar({ className, children }: ComponentPropsWithRef<'nav'>) {
  const [mounted, setMounted] = useState(false)
  const [currentSection, setCurrentSection] = useState<'products' | 'til' | null>(null)

  useEffect(() => setMounted(true), [])

  return (
    <nav className={cn('bg-background flex justify-center shadow-lg', className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0 lg:px-8">
        <Link href="/">
          <img src="/images/avatar.jpg" alt="Neo" className="hidden size-10 rounded-full md:block" />
        </Link>
        <div className="items-centerspace-x-4 flex">
          <Button
            className='intersect-once intersect:animate-fade-right intersect:opacity-100 w-32 opacity-0'
            asChild
            variant={currentSection === 'products' ? 'default' : 'ghost'}
            onClick={() => setCurrentSection('products')}
          >
            <Link href="/#products" className="gap-2">
              <FaRocket /> <span className=" font-bold">Products</span>
            </Link>
          </Button>
          <Button
            className='intersect-once intersect:animate-fade-left intersect:opacity-100 w-32 opacity-0'
            asChild
            variant={currentSection === 'til' ? 'default' : 'ghost'}
            onClick={() => setCurrentSection('til')}
          >
            <Link href="/#til" className="gap-2">
              <FaLightbulb /><span className=" font-bold">TIL</span>
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