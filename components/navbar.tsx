"use client"
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { FiBookOpen, FiHome, FiMoon, FiSun, FiZap } from 'react-icons/fi'
import { ImHome3 } from 'react-icons/im'
import { useTheme } from 'next-themes'
import { Tabs } from 'react-daisyui'
import { ClientRenderOnly, DarkModeSwitch, ThemeType } from 'ui'
import type { BaseProps } from 'shared-types'
import { isBrowser } from 'utils/helpers'
import SearchButton from './search-button'
import Footer from './footer'
import { daisyui } from '../tailwind.config'

export default function Navbar({ className, children }: BaseProps<'nav'>) {
  const router = useRouter()
  const { theme: currentThemeName, setTheme } = useTheme()

  const h2Cls =
    'flex text-xl font-bold sm:w-26 flex cursor-pointer items-center !space-x-1 px-1 py-1 sm:space-x-0 text-accent border-gray-400/0 border-b-2'
  const iconCls = 'hidden sm:inline-block'

  return (
    <nav
      className={twMerge(
        'flex flex-row items-center justify-between py-2 sm:py-3',
        className,
      )}
    >
      <Link href='/'>
        <ImHome3 className='hidden h-7 w-7 sm:inline-block' />
      </Link>
      <div className="flex items-center">
        <SearchButton className="h-7 w-7 drop-shadow-lg" />
        {children}
        <ClientRenderOnly>
          <DarkModeSwitch
            className="ml-4 h-7 w-7 animate-spin-short drop-shadow-lg"
            icons={[FiSun, FiMoon]}
            presetThemes={daisyui.themes as ThemeType[]}
            setTheme={setTheme}
            currentThemeName={currentThemeName as string}
          />
        </ClientRenderOnly>
      </div>
    </nav>
  )
}