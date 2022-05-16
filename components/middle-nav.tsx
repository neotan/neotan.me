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
  const isActive = href === pathname
  return (
    <Link href={href}>
      <a
        className={twMerge(
          'sm:w-26 bg-link flex h-10 cursor-pointer items-center space-x-2 rounded-md border-b-8 border-b-transparent p-4 pt-5 transition sm:space-x-0',
          clsx({
            'rounded-b-none border-b-red-600': isActive,
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
