import * as React from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import type { BaseProps } from 'shared-types'

export default function AppsIndex() {
  const cardCls = 'w-full h-64 sm:w-1/2 lg:w-1/3 bg-base border-secondary'
  return (
    <>
      <div className="flex grow flex-wrap items-center justify-center gap-6 p-8">
        <div className={cardCls}>
          <h1 className='
          flex h-full items-center justify-center text-center font-heading text-[clamp(4rem,7vw,5rem)] font-bold'>Hash</h1>
          <footer className='flex justify-center p-4 pb-8'>
            <Link href='hash.npmhub.net'><span className='font-heading text-2xl'>hash.npmhub.net</span></Link>
          </footer>
        </div>
        <div className={cardCls}>
          <h1 className='
          flex h-full items-center justify-center text-center font-heading text-[clamp(2.5rem,7vw,4rem)] font-bold leading-tight'>Image Converter</h1>
          <footer className='flex justify-center p-4 pb-8'>
            <Link href='#'><span className='font-heading text-2xl'>Coming Soon...</span></Link>
          </footer>
        </div>
      </div>
    </>
  )
}

function FlexText({ children, className, rootProps = {} }: BaseProps<'svg'>) {
  return (
    <svg viewBox="0 0 100 100" {...rootProps}>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" className={twMerge(className)}>{children}</text>
    </svg>
  )
}