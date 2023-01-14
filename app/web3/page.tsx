import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import type { BaseProps } from 'shared-types'
import {
  About,
  Explore,
  Feedback,
  Footer,
  GetStarted,
  Hero,
  Insights,
  Navbar,
  WhatsNew,
  World,
} from './components'

export default function Web3Page() {
  const cardCls = 'w-full h-64 sm:w-1/2 lg:w-1/3 bg-base border-secondary'
  return (
    <>
      <div className="">
        <Navbar />
        <Hero />
        <About />
        <Explore />
        <GetStarted />
        <Insights />
        <WhatsNew />
        <World />
        <Feedback />
        <Footer />
      </div>
    </>
  )
}
