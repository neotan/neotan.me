import { useTheme } from 'next-themes'
import { keys } from 'ramda'
import { daisyui } from '../tailwind.config'

const THEMES = daisyui.themes.map((themeName, i) => {
  return {
    name: (keys(themeName)?.[0] || themeName) as string,
    icon: daisyui.themeIcons[i],
  }
})

let count = 0

export default function DarkModeSwitch() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      suppressHydrationWarning={true}
      className="text-3xl"
      title={theme}
      onClick={() => {
        count++
        return setTheme(
          THEMES[count % THEMES?.length].name || (THEMES[0].name as string),
        )
      }}
    >
      {THEMES[count % THEMES?.length]?.icon || THEMES[0].icon}
    </button>
  )
}
