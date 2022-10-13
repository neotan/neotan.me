import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { FiBookOpen, FiHome, FiZap } from 'react-icons/fi'
import { BaseProps } from '~/types'
import SearchButton from './search-button'
import ClientRenderOnly from './client-render-only'
import DarkModeSwitch from './dark-mode-switch'
import Footer from './footer'

export function DefaultLayout({ children, className }: BaseProps<'div'>) {
  return (
    <div className={twMerge('flex h-screen flex-col', className)}>
      <TopNav className="z-10" />
      {children}
      <Footer />
    </div>
  )
}

export function TopNav({ className }: BaseProps<'nav'>) {
  const { asPath } = useRouter()

  const h2Cls =
    'flex text-xl font-bold sm:w-26 flex cursor-pointer items-center !space-x-1 px-1 py-1 sm:space-x-0 text-accent border-gray-400 border-b-2 border-opacity-0'
  const iconCls = 'hidden sm:inline-block'

  return (
    <nav
      className={twMerge(
        'flex flex-row items-center justify-between py-2 px-3 sm:py-3 sm:px-8',
        className,
      )}
    >
      <div className="text-shadow flex max-w-2xl flex-grow justify-start sm:space-x-5">
        <Link passHref href="/">
          <h2
            className={clsx(h2Cls, {
              'border-opacity-60': isActive(asPath, '/'),
            })}
          >
            <FiHome className={iconCls} />
            <div>HOME</div>
          </h2>
        </Link>
        <Link passHref href="/blog">
          <h2
            className={clsx(h2Cls, {
              'border-opacity-60': isActive(asPath, '/blog'),
            })}
          >
            <FiBookOpen className={iconCls} />
            <div>BLOG</div>
          </h2>
        </Link>
        <Link passHref href="/apps">
          <h2
            className={clsx(h2Cls, {
              'border-opacity-60': isActive(asPath, '/apps'),
            })}
          >
            <FiZap className={iconCls} />
            <div>APPS</div>
          </h2>
        </Link>
      </div>
      <div className="flex items-center">
        <SearchButton className="h-7 w-7 stroke-accent drop-shadow-lg" />
        <ClientRenderOnly>
          <DarkModeSwitch className="ml-4 h-7 w-7 stroke-accent drop-shadow-lg" />
        </ClientRenderOnly>
      </div>
    </nav>
  )
}

function isActive(asPath, href) {
  return asPath === href || asPath.startsWith(href + '/')
}
