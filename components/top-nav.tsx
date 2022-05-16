import MiddleNav from './middle-nav'
import RightNav from './right-nav'
import SiteLogo from './site-logo'

export default function TopNav() {
  return (
    <nav className="shadow-secondary bg-secondary fixed top-0 z-50 flex w-full flex-row items-center justify-between p-3 sm:p-4">
      <SiteLogo />
      <MiddleNav />
      <RightNav />
    </nav>
  )
}
