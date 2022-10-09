import { Link as Anchor } from 'react-daisyui'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="flex items-center justify-between space-x-6 p-2 opacity-30 hover:opacity-90 sm:flex-col">
      <div className="flex space-x-4">
        <Anchor href="https://github.com/neotan/neotan.me">
          <FaGithub className="cursor-pointer" size={24} />
        </Anchor>
        <Anchor href="https://www.linkedin.com/in/neotan/">
          <FaLinkedin className="cursor-pointer" size={24} />
        </Anchor>
      </div>
      <div className="justify-center space-x-2 font-heading text-lg sm:flex">
        <span>All rights reserved</span>{' '}
        <span className="block sm:inline">{`© Neo Tan ${new Date().getFullYear()}`}</span>
      </div>
    </footer>
  )
}
