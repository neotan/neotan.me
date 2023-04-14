import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { slice } from 'ramda'
import React, { ComponentPropsWithoutRef } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
//@ts-ignore
import { daisyui } from '../tailwind.config'

const DarkModeSwitch = dynamic(() => import('ui')
  .then(mod => mod.DarkModeSwitch),
{
  loading: () => <div className='h-8 w-8 bg-transparent' />,
  ssr: false
})


export default function Layout({ children }: ComponentPropsWithoutRef<'div'>) {
  const { theme: currentThemeName, setTheme } = useTheme()
  return (
    <div className="mx-auto max-w-screen-lg px-3 py-4">
      <nav className="flex justify-between">
        <h1 className="cursor-pointer bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">HASH</h1>
        <DarkModeSwitch
          className='animate-spin-short'
          icons={[FiSun, FiMoon]}
          presetThemes={daisyui.themes}
          setTheme={setTheme}
          currentThemeName={currentThemeName!}
        />
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