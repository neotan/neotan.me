'use client'
import * as React from 'react'

import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'

import { cn } from '@/lib/utils'


export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  const Icon = theme === 'dark'
    ? BiMoon
    : BiSun

  return (
    <Icon
      className={cn('size-8 cursor-pointer fill-primary hover:animate-spin', className)}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />

  )
}
