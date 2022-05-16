import TopNav from './top-nav'
import Footer from './footer'

function Layout({children}) {
  return (
    <div className="flex h-screen flex-col">
      <TopNav />
      <main className="mt-20 mb-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
