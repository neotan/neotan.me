import { type ComponentPropsWithoutRef } from 'react'

import Link from 'next/link'

import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { env } from '@/env'
import { cn } from '@/lib/utils'

export default function Footer({ className, children }: ComponentPropsWithoutRef<'footer'>) {
  return (
    <footer
      className={cn(
        'border-t border-[#323232]/50',
        'bg-[#070707]',
        'px-6 py-8',
        className,
      )}
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              className={cn(
                'text-muted-foreground',
                'transition-colors duration-200',
                'hover:text-foreground'
              )}
              href="https://github.com/neotan/neotan.me"
              target="_blank"
            >
              <FaGithub className="size-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm font-light text-muted-foreground">
            © Neo Tan {new Date().getFullYear()}. All rights reserved.
          </p>

          {/* Build info */}
          <div className="text-xs text-transparent">
            {(env.VERCEL_GIT_COMMIT_SHA ?? '').slice(0, 7) || 'dev'}
          </div>
        </div>
      </div>
      {children}
    </footer>
  )
}
