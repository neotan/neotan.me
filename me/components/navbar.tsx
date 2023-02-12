import { useTheme } from 'next-themes'
import { ComponentPropsWithoutRef } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'
import { ClientRenderOnly, DarkModeSwitch } from 'ui'
import { cn } from 'utils/helpers'
// @ts-ignore
import { daisyui } from '../tailwind.config'
import SearchButton from './search-button'

export default function Navbar({ className, children }: ComponentPropsWithoutRef<'nav'>) {
  const { theme: currentThemeName, setTheme } = useTheme()

  return (
    <nav
      className={cn(
        'flex flex-row items-center justify-between py-2 text-secondary sm:py-3',
        className,
      )}
    >
      {children}
      <div className='flex items-center'>
        <div className='rounded-full bg-secondary/5 p-3 hover:bg-secondary/10'>
          <SearchButton className='h-7 w-7 fill-secondary' />
        </div>
        <ClientRenderOnly>
          <div className='rounded-full bg-secondary/5 p-3 hover:bg-secondary/10'>
            <DarkModeSwitch
              className='h-7 w-7 animate-spin-short fill-secondary hover:animate-spin'
              icons={[BiSun, BiMoon]}
              presetThemes={daisyui.themes}
              setTheme={setTheme}
              currentThemeName={currentThemeName!}
            />
          </div>
        </ClientRenderOnly>
      </div>
    </nav>
  )
}