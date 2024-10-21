import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { FaGithub } from 'react-icons/fa'
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
        {(process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
          process.env.VERCEL_GIT_COMMIT_SHA ||
          '').slice(0, 6)
        }
      </div>
    </footer>
  )
}
