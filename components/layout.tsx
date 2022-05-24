import {motion as mo} from 'framer-motion'
import TopNav from './top-nav'
import Footer from './footer'

const variants = {
  hidden: {opacity: 0, x: -200, y: 0},
  enter: {opacity: 1, x: 0, y: 0},
  exit: {opacity: 0, x: 0, y: -100},
}

function Layout({children}) {
  return (
    <div className="flex h-screen flex-col">
      <TopNav />
      <mo.main
        className="mt-[72px] mb-auto"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{type: 'linear'}}
      >
        {children}
      </mo.main>
      <Footer />
    </div>
  )
}

export default Layout
