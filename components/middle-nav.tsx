import {ReactNode} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {twMerge} from 'tailwind-merge'
import clsx from 'clsx'
import {BookOpenIcon, LightningBoltIcon} from '@heroicons/react/outline'

type NavMidItemProps = {
  title?: ReactNode
  href?: string
  icon?: any
}

function NavItem({title, href = '/', icon: Icon}: NavMidItemProps) {
  const {pathname} = useRouter()
  const isActive = pathname.startsWith(href)
  return (
    <Link href={href}>
      <a
        className={twMerge(
          'sm:w-26 bg-link flex h-10 cursor-pointer items-center space-x-2 rounded-md p-4 opacity-50 transition hover:opacity-100 sm:space-x-0',
          clsx({
            'opacity-100': isActive,
          }),
        )}
      >
        <Icon className="mr-1 hidden h-5 sm:inline-block" />
        <h2 className="text-xl font-bold">{title}</h2>
      </a>
    </Link>
  )
}

export default function MiddleNav() {
  return (
    <div className="flex max-w-2xl flex-grow justify-evenly">
      <NavItem title="BLOGS" icon={BookOpenIcon} href="/blogs" />
      <NavItem title="APPS" icon={LightningBoltIcon} href="/apps" />
    </div>
  )
}
