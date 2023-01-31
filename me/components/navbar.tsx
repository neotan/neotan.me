import { ComponentPropsWithoutRef } from 'react'
import { cn } from 'utils/helpers'
import { BiMoon, BiSun } from 'react-icons/bi'
import { useTheme } from 'next-themes'
import { ClientRenderOnly, DarkModeSwitch } from 'ui'
import SearchButton from './search-button'
import { daisyui } from '../tailwind.config'

export default function Navbar({ className, children }: ComponentPropsWithoutRef<'nav'>) {
  const { theme: currentThemeName, setTheme } = useTheme()

  return (
    <nav
      className={cn(
        'flex flex-row items-center justify-between py-2 sm:py-3 text-secondary fill-secondary',
        className,
      )}
    >
      {children}
      <div className='flex items-center'>
        <div className='bg-secondary/5 hover:bg-secondary/10 rounded-full p-3'>
          <SearchButton className='h-7 w-7' />
        </div>
        <ClientRenderOnly>
          <div className='bg-secondary/5 hover:bg-secondary/10 rounded-full p-3'>
            <DarkModeSwitch
              className='h-7 w-7 animate-spin-short hover:animate-spin'
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