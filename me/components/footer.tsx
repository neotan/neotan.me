import Link from 'next/link'
import { slice } from 'ramda'
import { FaGithub } from 'react-icons/fa'
import type { BaseProps } from 'shared-types'
import { twMerge } from 'tailwind-merge'

export default function Footer({ className }: BaseProps<'footer'>) {
  return (
    <footer
      className={twMerge(
        'flex items-center justify-between space-x-6 p-2 pb-0 sm:flex-col',
        className,
      )}
    >
      <div className="flex space-x-4">
        <Link
          href="https://github.com/neotan/neotan.me/tree/master/me"
          rel='noopener noreferrer'
          target='_blank'
        >
          <FaGithub className="cursor-pointer" size={24} />
        </Link>
      </div>
      <div className="font-heading justify-center space-x-2 text-lg sm:flex">
        <span>All rights reserved</span>{' '}
        <span className="block sm:inline">© Neo Tan {new Date().getFullYear()}</span>
      </div>
      <div className="hidden text-xs text-transparent sm:flex">
        <span>Build:</span>
        {slice(
          0,
          6,
          process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
          process.env.VERCEL_GIT_COMMIT_SHA ||
          '',
        )}
      </div>
    </footer>
  )
}
