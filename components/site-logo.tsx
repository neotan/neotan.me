import Link from 'next/link'
import Image from 'next/image'

export default function SiteLogo() {
  return (
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
  )
}
