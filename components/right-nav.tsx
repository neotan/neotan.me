import {MoonIcon, SearchIcon, SunIcon} from '@heroicons/react/outline'
import {useTheme} from 'next-themes'

function SearchButton() {
  return <SearchIcon className="h-8 cursor-pointer " />
}

function DarkModeToggle() {
  function toggle() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const {theme, setTheme} = useTheme()
  const Icon = theme === 'light' ? SunIcon : MoonIcon

  return (
    <button onClick={toggle}>
      <Icon className="h-8 cursor-pointer" />
    </button>
  )
}

export default function RightNav() {
  return (
    <div className="flex max-w-[8rem] flex-grow justify-evenly">
      <SearchButton />
      <DarkModeToggle />
    </div>
  )
}
