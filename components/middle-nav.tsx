import {ReactNode} from 'react'
import Link from 'next/link'
import {
  BookOpenIcon,
  LightningBoltIcon,
  TagIcon,
} from '@heroicons/react/outline'

type NavMidItemProps = {
  title?: ReactNode
  href?: string
  icon?: any
}

function NavItem({title, href = '/', icon: Icon}: NavMidItemProps) {
  return (
    <Link href={href} passHref>
      <a className="sm:w-26 bg-link group flex h-10 cursor-pointer items-center space-x-2 rounded-md p-3 transition  sm:space-x-0 sm:hover:scale-110">
        <Icon className="mr-1 hidden h-5 sm:inline-block" />
        <h2 className="text-xl font-bold">{title}</h2>
      </a>
    </Link>
  )
}

export default function MiddleNav() {
  return (
    <div className="flex max-w-2xl flex-grow justify-evenly">
      <NavItem title="BLOGS" icon={BookOpenIcon} href={'/blogs'} />
      <NavItem title="PRODUCTS" icon={LightningBoltIcon} href={'/products'} />
      <NavItem title="TAGS" icon={TagIcon} href={'/tags'} />
    </div>
  )
}
