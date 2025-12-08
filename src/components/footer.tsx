import { type ComponentPropsWithoutRef } from 'react'

import Link from 'next/link'

import { FaGithub } from 'react-icons/fa'

import { env } from '@/env'
import { cn } from '@/lib/utils'

export default function Footer({ className, children }: ComponentPropsWithoutRef<'footer'>) {
  return (
    <footer
      className={cn(
        'flex items-center justify-between p-4 text-muted-foreground sm:flex-col',
        className,
      )}
    >
      <div className="flex">
        <Link
          href="https://github.com/neotan/neotan.me"
          target='_blank'
        >
          <FaGithub className="cursor-pointer" size={24} />
        </Link>
      </div>
      <div className="flex justify-center text-lg">
        <p>All rights reserved</p>{' '}
        <p>© Neo Tan {new Date().getFullYear()}</p>
      </div>
      {children}
      <div className="hidden text-xs text-transparent sm:flex">
        <span>Build:</span>
        {(env.VERCEL_GIT_COMMIT_SHA ?? '').slice(0, 4)
        }
      </div>
    </footer>
  )
}
