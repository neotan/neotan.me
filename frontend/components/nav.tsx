import {useRouter} from 'next/router'
import requests from './../shared/request'
interface NavProps {}

function Nav<NavProps>() {
  const router = useRouter()
  return (
    <nav className="relative">
      <div className="flex space-x-10 overflow-x-scroll whitespace-nowrap px-10 text-2xl scrollbar-hide sm:space-x-20 sm:px-20">
        {Object.entries(requests).map(([key, {title, url}]) => {
          return (
            <h2
              key={title}
              onClick={() => router.push(`/?genre=${key}`)}
              className="transform cursor-pointer transition duration-100 hover:scale-125 hover:text-white active:text-red-500"
            >
              {title}
            </h2>
          )
        })}
      </div>
      <div className="absolute top-0 right-0 h-10 w-1/12 bg-gradient-to-l from-[#06202A]" />
    </nav>
  )
}

export default Nav
