import { useTheme } from 'next-themes'
import { slice } from 'ramda'
import * as React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import type { BaseProps } from 'shared-types'
import { ClientRenderOnly, DarkModeSwitch, ThemeType } from 'ui'
//@ts-ignore
import { daisyui } from '../tailwind.config'

export default function Layout({ children }: BaseProps<'div'>) {
  const { theme: currentThemeName, setTheme } = useTheme()
  return (
    <div className="mx-auto max-w-screen-lg py-4 px-3">
      <nav className="flex justify-between">
        <h1 className="cursor-pointer bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">HASH</h1>
        <ClientRenderOnly>
          <DarkModeSwitch
            className='animate-spin-short'
            icons={[FiSun, FiMoon]}
            presetThemes={daisyui.themes as ThemeType[]}
            setTheme={setTheme}
            currentThemeName={currentThemeName as string}
          />
        </ClientRenderOnly>
      </nav>{children}

      <footer className="flex flex-col items-center justify-center pb-4 text-gray-500 text-opacity-20 hover:text-opacity-100">
        <div className="flex text-transparent">
          <span>Build:</span>
          {slice(
            0,
            6,
            process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
            process.env.VERCEL_GIT_COMMIT_SHA ||
            '',
          )}
        </div>
        <div className="flex flex-col items-center text-center font-heading text-lg">
          <div>{`All rights reserved © Neo Tan ${new Date().getFullYear()}`}</div>
        </div>
      </footer>
    </div>
  )

}