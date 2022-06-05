import MiddleNav from './middle-nav'
import RightNav from './right-nav'

export default function TopNav() {
  return (
    <nav className="shadow-secondary bg-secondary fixed top-0 z-50 flex max-h-[72px] w-full flex-row items-center justify-between py-3 sm:py-4 sm:px-8">
      <MiddleNav />
      <RightNav />
    </nav>
  )
}
