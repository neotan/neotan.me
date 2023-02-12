import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef } from 'react'
import { FaLightbulb, FaRocket } from 'react-icons/fa'
import { cn } from 'utils/helpers'

import Tabs from '@/components/tabs'

export default function MenuTabs({ className, children }: ComponentPropsWithoutRef<'section'>) {

  const currentPathname = usePathname()

  return (

    <section className={cn('flex grow flex-col items-center gap-4 text-secondary', className)}>
      <Tabs className='flex gap-6'>
        <Link href='/'>
          <Tabs.Tab
            className={cn('gap-3', { 'text-accent bg-accent/10': currentPathname === '/' })}
          >
            <FaRocket /><span>Projects</span>
          </Tabs.Tab>
        </Link>
        <Link href='/blog'>
          <Tabs.Tab
            className={cn('gap-3', { 'text-error bg-error/10': currentPathname === '/blog' })}
          >
            <FaLightbulb /><span>TLDR</span>
          </Tabs.Tab>
        </Link>
      </Tabs>
      {children}
    </section>
  )
}
