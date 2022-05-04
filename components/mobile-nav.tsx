import Link from 'next/link'

export default function MobileNav() {
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
