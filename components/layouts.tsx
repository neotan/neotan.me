import { motion as mo } from 'framer-motion'
import MiddleNav from './middle-nav'
import SearchButton from './search-button'
import ClientRenderOnly from './client-render-only'
import DarkModeSwitch from './dark-mode-switch'

import Footer from './footer'

export function DefaultLayout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <TopNav />
      <main className="mt-[72px] mb-auto">{children}</main>
      <Footer />
    </div>
  )
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 50 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export function SlideUpLayout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <TopNav />
      <mo.main
        className="mt-[72px] mb-auto"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear' }}
      >
        {children}
      </mo.main>
      <Footer />
    </div>
  )
}

export function TopNav() {
  return (
    <nav className="fixed top-0 z-50 flex max-h-[72px] w-full flex-row items-center justify-between bg-secondary py-3 shadow-secondary sm:py-4 sm:px-8">
      <MiddleNav />
      <div className="flex min-w-[5rem] max-w-[8vw] flex-grow justify-evenly">
        <SearchButton />
        <ClientRenderOnly>
          <DarkModeSwitch />
        </ClientRenderOnly>
      </div>
    </nav>
  )
}
