import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { BoltIcon, BookOpenIcon, HomeIcon } from '@heroicons/react/24/outline'
import { BaseProps } from '~/types/index'
import SearchButton from './search-button'
import ClientRenderOnly from './client-render-only'
import DarkModeSwitch from './dark-mode-switch'
import Footer from './footer'

export function DefaultLayout({ children, className }: BaseProps<'div'>) {
  return (
    <div className={twMerge('flex h-screen flex-col', className)}>
      <TopNav />
      {children}
      <Footer />
    </div>
  )
}

export function ListLayout({ children, className }: BaseProps<'div'>) {
  return (
    <DefaultLayout>
      <main>{children}</main>
    </DefaultLayout>
  )
}

export function TopNav({ className }: BaseProps<'nav'>) {
  const { asPath } = useRouter()

  const h2Cls =
    'text-xl font-bold sm:w-26 flex h-10 cursor-pointer items-center space-x-2 rounded-md p-2 opacity-80 hover:opacity-100 sm:space-x-0 text-accent'
  const iconCls = 'mr-1 hidden h-5 sm:inline-block'

  return (
    <nav
      className={twMerge(
        'flex flex-row items-center justify-between py-2 sm:py-3 sm:px-8',
        className,
      )}
    >
      <div className="flex max-w-2xl flex-grow justify-start sm:space-x-5">
        <Link passHref href="/">
          <h2
            className={clsx(h2Cls, {
              'opacity-100': isActive(asPath, '/'),
            })}
          >
            <HomeIcon className={iconCls} />
            HOME
          </h2>
        </Link>
        <Link passHref href="/blog">
          <h2
            className={clsx(h2Cls, {
              'opacity-100': isActive(asPath, '/blog'),
            })}
          >
            <BookOpenIcon className={iconCls} />
            BLOG
          </h2>
        </Link>
        <Link passHref href="/apps">
          <h2
            className={clsx(h2Cls, {
              'opacity-100': isActive(asPath, '/apps'),
            })}
          >
            <BoltIcon className={iconCls} />
            APPS
          </h2>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <SearchButton className="h-7 w-7 stroke-accent" />
        <ClientRenderOnly>
          <DarkModeSwitch />
        </ClientRenderOnly>
      </div>
    </nav>
  )
}

function isActive(asPath, href) {
  return asPath === href || asPath.startsWith(href + '/')
}
