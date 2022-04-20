import TopNav from './top-nav'

function Layout({children}) {
  return (
    <>
      <TopNav />
      <main className="mt-20">{children}</main>
      <footer>Footer</footer>
    </>
  )
}

export default Layout
