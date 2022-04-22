import Link from 'next/link'
import GithubIcon from 'icons/github-icon'
import LinkedinIcon from 'icons/linkedin-icon'
import TopNav from './top-nav'
import Footer from './footer'

function Layout({children}) {
  return (
    <>
      <TopNav />
      <main className="mt-20">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
