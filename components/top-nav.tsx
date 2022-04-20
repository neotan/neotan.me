import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  SunIcon,
  MoonIcon,
  LightningBoltIcon,
  SearchIcon,
  BookOpenIcon,
  TagIcon,
} from '@heroicons/react/outline'
import {useTheme} from 'next-themes'

function SearchButton() {
  return <SearchIcon className="h-8 cursor-pointer " />
}

function DarkModeToggle() {
  const {theme, setTheme} = useTheme()
  function toggle() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const Icon = theme === 'dark' ? MoonIcon : SunIcon
  return (
    <button onClick={() => toggle()}>
      <Icon className="h-8 cursor-pointer" />
    </button>
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
  title?: React.ReactNode
  href?: string
  icon?: any
}
function NavMidItem({title, href = '/', icon: Icon}: NavMidItemProps) {
  return (
    <Link href={href} passHref>
      <div className="sm:w-26 group flex h-10 cursor-pointer items-center space-x-2 transition sm:space-x-0 sm:hover:scale-110 ">
        <Icon className="mr-1 hidden h-5 sm:inline-block" />
        <h2 className="text-xl">{title}</h2>
      </div>
    </Link>
  )
}

export default function TopNav() {
  return (
    <nav className="shadow-primary bg-secondary fixed top-0 z-50 flex w-full flex-row items-center justify-between p-3 sm:p-4">
      <Link href="/" passHref>
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
        <NavMidItem title="BLOGS" icon={BookOpenIcon} href={'/blogs'} />
        <NavMidItem
          title="PRODUCTS"
          icon={LightningBoltIcon}
          href={'/products'}
        />
        <NavMidItem title="TAGS" icon={TagIcon} href={'/tags'} />
      </div>
      <div className="flex max-w-[8rem] flex-grow justify-evenly">
        <SearchButton />
        <DarkModeToggle />
      </div>
    </nav>
  )
}
