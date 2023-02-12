import { ComponentPropsWithoutRef } from 'react'
import { cn } from 'utils/helpers'

export default function Bio({ className, children }: ComponentPropsWithoutRef<'section'>) {
  return (
    <section className={cn('px-0 text-2xl font-extrabold text-secondary sm:text-3xl', className)}>
      <p><span className='text-primary'>I&apos;m Neo</span>, a software engineer based in Canada🍁, love creating apps, tools and helping people to make great web🌏. Checkout out my excellent works👇.</p>
      {children}
    </section>
  )
}
