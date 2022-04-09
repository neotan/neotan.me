import * as React from 'react'
import Image from 'next/image'
import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/outline'
import HeaderItem from './header-item'

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row transition-transform h-auto m-5 justify-between items-center">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItem title="HOME" Icon={HomeIcon} />
        <HeaderItem title="HOME" Icon={LightningBoltIcon} />
        <HeaderItem title="VERIFIED" Icon={BadgeCheckIcon} />
        <HeaderItem title="COLLECTIONS" Icon={CollectionIcon} />
        <HeaderItem title="SEARCH" Icon={SearchIcon} />
      </div>
      <Image
        className="object-contain"
        src="/images/hulu-white.webp"
        alt="hulu logo"
        width={200}
        height={100}
      />
    </header>
  )
}
