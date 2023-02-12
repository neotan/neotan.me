'use client'
import { ComponentPropsWithRef } from 'react'
import { cn } from 'utils/helpers'

export default function Tabs({ children, className, ...restProps }: ComponentPropsWithRef<'div'>) {
  return <div className={cn('flex', className)} {...restProps}>
    {children}
  </div>
}

function Tab({ children, className, onClick, ...restProps }: ComponentPropsWithRef<'button'>) {

  return <button
    className={
      cn('flex items-center justify-center gap-2 rounded-2xl p-4 text-lg font-bold hover:bg-accent/5', className)}
    {...restProps}
    data-value='projects'
    onClick={onClick}>
    {children}
  </button>

}

Tabs.Tab = Tab
