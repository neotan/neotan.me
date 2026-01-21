'use client'
import * as React from 'react'

import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'
import { GiPumpkin } from 'react-icons/gi'
import { HiOutlineSparkles } from 'react-icons/hi'

import { cn } from '@/lib/utils'

const themeIcons = {
  light: BiSun,
  dark: BiMoon,
  pumpkin: GiPumpkin,
  neverhack: HiOutlineSparkles,
} as const

const themeOrder = ['light', 'dark', 'pumpkin', 'neverhack'] as const

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (theme ?? 'neverhack') as keyof typeof themeIcons
  const Icon = themeIcons[currentTheme] ?? BiSun

  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(currentTheme)
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeOrder.length
    const nextTheme = themeOrder[nextIndex] ?? 'neverhack'
    setTheme(nextTheme)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className={cn('size-8', className)} />
  }

  return (
    <Icon
      className={cn('size-8 cursor-pointer fill-primary hover:animate-spin', className)}
      title={`Current theme: ${currentTheme}. Click to cycle themes.`}
      onClick={cycleTheme}
    />
  )
}
