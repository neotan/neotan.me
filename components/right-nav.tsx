import {MoonIcon, SearchIcon, SunIcon} from '@heroicons/react/outline'
import {useTheme} from 'next-themes'

function SearchButton() {
  return <SearchIcon className="h-8 cursor-pointer " />
}

function DarkModeToggle() {
  const {theme, setTheme} = useTheme()
  function toggle() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const Icon = theme === 'light' ? MoonIcon : SunIcon

  return (
    <button onClick={() => toggle()}>
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
