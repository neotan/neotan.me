import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { ComponentPropsWithoutRef } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'
import { cn } from 'utils/helpers'
// @ts-ignore
import { daisyui } from '../tailwind.config'
import SearchButton from './search-button'


const DarkModeSwitch = dynamic(() => import('ui')
  .then(mod => mod.DarkModeSwitch),
{
  loading: () => <div className='h-7 w-7 bg-transparent' />,
  ssr: false
})

export default function Navbar({ className, children }: ComponentPropsWithoutRef<'nav'>) {
  const { theme: currentThemeName, setTheme } = useTheme()

  return (
    <nav
      className={cn(
        'flex flex-row items-center justify-between py-2 text-secondary',
        className,
      )}
    >
      {children}
      <div className='flex items-center'>
        <div className='rounded-full bg-secondary/5 p-3 hover:bg-secondary/10'>
          <SearchButton className='h-7 w-7 fill-secondary' />
        </div>
        <div className='rounded-full bg-secondary/5 p-3 hover:bg-secondary/10'>
          <DarkModeSwitch
            className='h-7 w-7 animate-spin-short fill-secondary hover:animate-spin'
            icons={[BiSun, BiMoon]}
            presetThemes={daisyui.themes}
            setTheme={setTheme}
            currentThemeName={currentThemeName!}
          />
        </div>
      </div>
    </nav>
  )
}