import Link from 'next/link'
import GithubIcon from 'icons/github-icon'
import LinkedinIcon from 'icons/linkedin-icon'

const iconClassName =
  'fill-primary cursor-pointer  hover:fill-gray-900 dark:hover:fill-gray-400'

export default function Footer() {
  return (
    <footer className="border-primary mt-40 flex items-center justify-between space-x-6 border-t-2 border-dashed p-5 sm:flex-col">
      <div className="flex space-x-4">
        <Link href="https://github.com/neotan">
          <a>
            <GithubIcon className={iconClassName} size={32} />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/neotan/">
          <a>
            <LinkedinIcon className={iconClassName} size={32} />
          </a>
        </Link>
      </div>
      <div className="justify-center space-x-2 font-heading text-lg text-gray-500 sm:mt-4 sm:flex sm:w-full">
        <span>All rights reserved</span>{' '}
        <span className="block sm:inline">{`© Neo Tan ${new Date().getFullYear()}`}</span>
      </div>
    </footer>
  )
}
