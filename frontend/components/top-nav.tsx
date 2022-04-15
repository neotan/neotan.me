import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  SunIcon,
  LightningBoltIcon,
  SearchIcon,
  BookOpenIcon,
  TagIcon,
} from '@heroicons/react/outline'

function SearchButton() {
  return (
    <SearchIcon className="h-8 cursor-pointer stroke-gray-400 hover:stroke-gray-50" />
  )
}

function DarkModeToggle() {
  // const [mode, setMode] = useTheme()
  return (
    <SunIcon className="h-8 cursor-pointer stroke-gray-400 hover:stroke-gray-50" />
  )
}

function MobileMenu() {
  return (
    <ul className="flex flex-grow justify-evenly sm:hidden">
      <Link href="/">BLOG</Link>
      <Link href="/">PRODUCTS</Link>
      <Link href="/">TAG</Link>
    </ul>
  )
}

type NavMidItemProps = {
  title: React.ReactNode
  Icon: any
}
function NavMidItem({title, Icon}: NavMidItemProps) {
  return (
    <div className="sm:w-26 group flex h-10 cursor-pointer items-center space-x-2 hover:text-white sm:space-x-0">
      <Icon className="mr-1 hidden h-5 stroke-gray-400 group-hover:stroke-gray-50 sm:inline-block" />
      <p className="text-xl tracking-widest text-gray-400 group-hover:text-gray-50">
        {title}
      </p>
    </div>
  )
}

export default function TopNav() {
  return (
    <header className="flex flex-row items-center justify-between bg-gray-800 p-3 font-heading sm:p-4">
      <Link href="/" passHref={true}>
        <div className="cursor-pointer object-contain transition hover:z-50 sm:hover:scale-125">
          <Image
            className="object-contain"
            src="/images/avatar-icon.svg"
            alt="logo"
            width={40}
            height={40}
          />
        </div>
      </Link>
      <div className="flex max-w-2xl flex-grow justify-evenly">
        <NavMidItem title="BLOG" Icon={BookOpenIcon} />
        <NavMidItem title="PRODUCTS" Icon={LightningBoltIcon} />
        <NavMidItem title="TAG" Icon={TagIcon} />
      </div>
      <div className="flex max-w-[8rem] flex-grow justify-evenly">
        <SearchButton />
        <DarkModeToggle />
      </div>
    </header>
  )
}
