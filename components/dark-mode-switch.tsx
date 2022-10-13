import { useTheme } from 'next-themes'
import { keys } from 'ramda'
import { twMerge } from 'tailwind-merge'
import { FiMoon, FiSun } from 'react-icons/fi'
import { BaseProps } from '~/types'
import { daisyui } from '../tailwind.config'

const THEMES = daisyui.themes.map(
  (themeName: string | Record<string, unknown>) => {
    const name = (keys(themeName)?.[0] || themeName) as string
    const icon = name === daisyui.darkTheme ? FiMoon : FiSun

    return {
      name,
      icon,
    }
  },
)

let count = 0

export default function DarkModeSwitch({ className }: BaseProps<'button'>) {
  const { theme, setTheme } = useTheme()
  const Icon = THEMES[count % THEMES?.length]?.icon || THEMES[0].icon
  return (
    <Icon
      className={twMerge('h-8 w-8 cursor-pointer', className)}
      title={theme}
      onClick={() => {
        count++
        return setTheme(THEMES[count % THEMES?.length].name || THEMES[0].name)
      }}
    />
  )
}
