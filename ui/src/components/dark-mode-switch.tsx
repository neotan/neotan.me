import { ComponentPropsWithoutRef } from 'react'
import { findIndex, keys, propEq, zipWith } from 'ramda'
import { twMerge } from 'tailwind-merge'
import { IconType } from 'react-icons'

export type ThemeType = Record<string, { name: string, [key: string]: any }> | string

type DarkModeSwitchProps = ComponentPropsWithoutRef<'svg'> & {
  currentThemeName: string
  setTheme: (theme: string) => void
  presetThemes: ThemeType[]
  icons: IconType[]
}

export function DarkModeSwitch({
  className,
  presetThemes = [],
  icons = [],
  currentThemeName,
  setTheme,
}: DarkModeSwitchProps) {

  const themes = zipWith((theme, Icon) => {
    return typeof theme === 'object'
      ? { Icon, name: keys(theme)[0] }
      : { Icon, name: theme }
  }, presetThemes as ThemeType[], icons)

  const currentIndex = Math.abs(findIndex(propEq('name', currentThemeName), themes))
  const { name: nextThemeName } = themes[(currentIndex + 1) % themes.length] || {}

  const Icon = icons[currentIndex]
  if (!Icon) return null

  return (
    <Icon
      className={twMerge('h-8 w-8 cursor-pointer', className)}
      data-title={currentThemeName}
      onClick={() => setTheme(nextThemeName)}
    />
  )
}
