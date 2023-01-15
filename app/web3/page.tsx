'use client'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { JetBrains_Mono, Mitr } from '@next/font/google'
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
} from '../../components-web3'

const mitr = Mitr({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700"]
})
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "100", "800"]
})


export default function Web3Page() {
  const cardCls = 'w-full h-64 sm:w-1/2 lg:w-1/3 bg-base border-secondary'
  return (
    <>
      <style jsx global>
        {`:root{
              --mitr-font: ${mitr.style.fontFamily};
              --jbmono-font: ${jetBrainsMono.style.fontFamily};
            }`}
      </style>
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
