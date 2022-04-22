import Link from 'next/link'
import GithubIcon from 'icons/github-icon'
import LinkedinIcon from 'icons/linkedin-icon'
import TopNav from './top-nav'

export default function Footer() {
  return (
    <footer className="mt-20 flex items-center justify-between space-x-6 p-5 sm:flex-col">
      <div className="flex space-x-4">
        <Link passHref href="https://github.com/neotan">
          <a>
            <GithubIcon
              className="cursor-pointer  fill-gray-400 hover:fill-gray-200"
              size={32}
            />
          </a>
        </Link>
        <Link passHref href="https://www.linkedin.com/in/neotan/">
          <a>
            <LinkedinIcon
              className="cursor-pointer fill-gray-400  hover:fill-gray-200"
              size={32}
            />
          </a>
        </Link>
      </div>
      <div className="justify-center space-x-2 text-lg text-gray-500 sm:mt-4 sm:flex sm:w-full">
        <span>All rights reserved</span>{' '}
        <span className="block sm:inline">{`© Neo Tan ${new Date().getFullYear()}`}</span>
      </div>
    </footer>
  )
}
