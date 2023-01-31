import { ComponentPropsWithoutRef } from 'react'
import { cn } from 'utils/helpers'

export default function Bio({ className, children }: ComponentPropsWithoutRef<'section'>) {
  return (
    <section className={cn('text-secondary px-0 text-2xl font-extrabold sm:px-10 sm:text-2xl', className)}>
      <p><span className='text-primary'>I&apos;m Neo</span>, a software engineer based in Canada🍁, love creating apps, tools and helping people to make great web🌏.</p>
      {children}
    </section>
  )
}
