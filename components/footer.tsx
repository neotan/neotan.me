import {motion as mo} from 'framer-motion'
import Link from 'next/link'
import GithubIcon from 'icons/github-icon'
import LinkedinIcon from 'icons/linkedin-icon'

const iconClassName =
  'fill-primary cursor-pointer  hover:fill-gray-900 dark:hover:fill-gray-400'

const variants = {
  visible: {opacity: 1, y: 0},
  hidden: {opacity: 0, y: -20},
}

export default function Footer() {
  return (
    <footer className="border-primary flex items-center justify-between space-x-6 p-3 sm:flex-col">
      <mo.div
        className="flex space-x-4"
        variants={variants}
        initial="hidden"
        whileInView="visible"
      >
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
      </mo.div>
      <mo.div
        className="justify-center space-x-2 font-heading text-lg text-gray-500 sm:mt-2 sm:flex"
        variants={variants}
        initial="hidden"
        whileInView="visible"
      >
        <span>All rights reserved</span>{' '}
        <span className="block sm:inline">{`© Neo Tan ${new Date().getFullYear()}`}</span>
      </mo.div>
    </footer>
  )
}
