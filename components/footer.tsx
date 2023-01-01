import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { slice } from 'ramda'
import { twMerge } from 'tailwind-merge'
import type { BaseProps } from 'shared-types'

export default function Footer({ className }: BaseProps<'footer'>) {
  return (
    <footer
      className={twMerge(
        'flex items-center justify-between space-x-6 p-2 pb-0 opacity-30 hover:opacity-90 sm:flex-col',
        className,
      )}
    >
      <div className="flex space-x-4">
        <Link href="https://github.com/neotan/neotan.me">
          <FaGithub className="cursor-pointer" size={24} />
        </Link>
        <Link href="https://www.linkedin.com/in/neotan/">
          <FaLinkedin className="cursor-pointer" size={24} />
        </Link>
      </div>
      <div className="justify-center space-x-2 font-heading text-lg sm:flex">
        <span>All rights reserved</span>{' '}
        <span className="block sm:inline">{`© Neo Tan ${new Date().getFullYear()}`}</span>
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
