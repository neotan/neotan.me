import {ReactNode} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpenIcon,
  LightningBoltIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
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
  const Icon = theme === 'light' ? MoonIcon : SunIcon

  return (
    <button onClick={() => toggle()}>
      <Icon className="h-8 cursor-pointer" />
    </button>
  )
}

function MobileMenu() {
  return (
    <ul className="flex flex-grow justify-evenly sm:hidden">
      <Link href="/">
        <a>BLOG</a>
      </Link>
      <Link href="/">
        <a>PRODUCTS</a>
      </Link>
      <Link href="/">
        <a>TAG</a>
      </Link>
    </ul>
  )
}

type NavMidItemProps = {
  title?: ReactNode
  href?: string
  icon?: any
}
function NavMidItem({title, href = '/', icon: Icon}: NavMidItemProps) {
  return (
    <Link href={href} passHref>
      <a className="sm:w-26 bg-link group flex h-10 cursor-pointer items-center space-x-2 rounded-md p-3 transition  sm:space-x-0 sm:hover:scale-110">
        <Icon className="mr-1 hidden h-5 sm:inline-block" />
        <h2 className="text-xl font-bold">{title}</h2>
      </a>
    </Link>
  )
}

export default function TopNav() {
  return (
    <nav className="shadow-primary bg-secondary fixed top-0 z-50 flex w-full flex-row items-center justify-between p-3 sm:p-4">
      <Link href="/" passHref>
        <a className="cursor-pointer object-contain transition hover:z-50 sm:hover:scale-125">
          <Image
            className="object-contain"
            src="/images/avatar-icon.svg"
            alt="logo"
            width={40}
            height={40}
          />
        </a>
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
