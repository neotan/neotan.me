'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { values } from 'ramda'
import { cn } from 'utils/helpers'
import { SiVisualstudiocode } from 'react-icons/si'
import {
  SiAlgolia,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiWebassembly
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import { FaGithub, FaSlackHash } from 'react-icons/fa'
import CloudinaryIcon from '@/icons/cloudinary-icon'
import TurborepoIcon from '@/icons/turborepo-icon'
import FramerIcon from '@/icons/framer-icon'
import MenuTabs from '@/components/menu-tabs'
import Bio from '@/components/bio'
import Navbar from '@/components/navbar'

export default function HomeIndex() {

  return (
    <>
      <Navbar className='px-0 sm:px-16' >
        <div className='relative'>
          <Image
            className='h-16 w-16 rounded-full shadow-3xl transition-transform hover:scale-150'
            alt='Avatar'
            src='/images/avatar.jpg'
            width={200}
            height={200}
          />
        </div>
      </Navbar>
      <Bio className='sm:px-16' />
      <MenuTabs />
      <section key='projects' className='xcursor-emoji-[🦝/6xl/red-500] relative flex flex-col gap-8'
      >
        {values(projects).map(({
          id,
          title,
          description,
          homepage,
          repoUrl,
          imageSrc,
          tags,
          published,
          stackIcons = [],
          className
        }: Project) => {
          if (!published) return null
          return (
            <div key={id} id={id} className='card group px-2 sm:px-8'>
              <div className="invisible absolute left-0 top-0 flex flex-col gap-2 group-hover:visible">
                <Link href={'#' + id}>
                  <FaSlackHash className='fill-secondary hidden h-7 w-7 sm:block' />
                </Link>
                {repoUrl && <Link href={repoUrl}>
                  <FaGithub className='fill-secondary hidden h-7 w-7 sm:block' />
                </Link>}
              </div>
              <div />
              <div className="card-body glassmorphism !bg-secondary/30  h-full gap-8 rounded-2xl p-4  shadow-lg shadow-black/40 sm:p-8">
                <Link href={homepage} target='_blank' rel="noopener noreferrer">
                  <Image
                    className={cn('rounded-3xl shadow-lg transition-transform hover:scale-105', className)}
                    alt={title}
                    src={imageSrc}
                    width={1600}
                    height={475}
                  />
                </Link>
                <div className='text-primary/70 group-hover:text-primary flex flex-col gap-3' >
                  <div className="flex-wrap text-center text-lg">{description}</div>
                  <div className="flex w-full flex-wrap items-center justify-center gap-4 transition-transform hover:scale-125">{
                    stackIcons.map(({ Icon, title }) => (
                      <div key={title} className="bg-secondary/20 rounded-full p-2  transition-transform hover:scale-150" title={title} >
                        <Icon className='h-5 w-5' title={title} />
                      </div>
                    ))
                  }</div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </ >
  )
}

interface Project {
  id: string
  title: string
  description?: ReactNode
  homepage: string
  repoUrl?: string
  imageSrc: string
  tags?: string[]
  published?: boolean
  stackIcons?: { Icon: IconType, title: string }[]
  className?: string
}

const projects: Record<string, Project> = {
  npmhub: {
    id: 'npmhub',
    title: 'NPMHUB.NET',
    description: 'Search and Compare NPM packages for the best-fits for your projects',
    homepage: 'https://npmhub.net',
    imageSrc: '/images/npmhub.png',
    tags: ['web'],
    published: true,
    stackIcons: [
      { Icon: SiAlgolia, title: 'Algolia Instant Search' },
      { Icon: CloudinaryIcon, title: 'Cloudinary Media CDN' },
      { Icon: TurborepoIcon, title: 'Turborepo Monorepo' },
      { Icon: SiNextdotjs, title: 'Next.js' },
      { Icon: SiReact, title: 'React' },
      { Icon: SiTypescript, title: 'TypeScript' },
      { Icon: SiTailwindcss, title: 'Tailwindcss' },
    ]

  },
  'neotan.vscode-auto-restart-typescript-eslint-servers': {
    id: 'neotan.vscode-auto-restart-typescript-eslint-servers',
    title: 'Auto Restart TypeScript / ESLint Servers',
    description: <><strong className='font-semibold'>VS Code Extension:</strong> Restart TypeScript or ESLint server automatically if monitored configuration or files changed.</>,
    homepage: 'https://marketplace.visualstudio.com/items?itemName=neotan.vscode-auto-restart-typescript-eslint-servers',
    repoUrl: 'https://github.com/neotan/vscode-auto-restart-typescript-eslint-servers',
    imageSrc: 'https://raw.githubusercontent.com/neotan/vscode-auto-restart-typescript-eslint-servers/master/images/_featured.png',
    tags: ['vscode', 'extension'],
    published: true,
    stackIcons: [
      { Icon: SiVisualstudiocode, title: 'VS Code Extension' },
      { Icon: SiTypescript, title: 'TypeScript' },
    ],
    className: 'h-60 object-cover'

  },
  'tailwind-plugin-cursor-emoji': {
    id: 'tailwind-plugin-cursor-emoji',
    title: 'Auto Restart TypeScript / ESLint Servers',
    description: <><strong className='font-semibold'>Tailwindcss Plugin: </strong>Enable using emoji as cursor.</>,
    homepage: 'https://www.npmjs.com/package/tailwind-plugin-cursor-emoji',
    repoUrl: 'https://github.com/neotan/tailwind-plugin-cursor-emoji',
    imageSrc: 'https://raw.githubusercontent.com/neotan/tailwind-plugin-cursor-emoji/master/images/featured.png',
    tags: ['tailwindcss', 'plugin', 'emoji', 'cursor'],
    published: true,
    stackIcons: [
      { Icon: SiTailwindcss, title: 'Tailwindcss' },
    ],
    className: 'h-64 object-cover'

  },
  hash: {
    id: 'hash',
    title: 'Hash',
    description: 'Generate text/file (up to 10GB) hash with WASM locally',
    homepage: 'http://hash.npmhub.net',
    repoUrl: 'https://github.com/neotan/neotan.me/tree/master/hash',
    imageSrc: '/images/hash.png',
    tags: ['web'],
    published: true,
    stackIcons: [
      { Icon: SiWebassembly, title: 'Webassembly' },
      { Icon: TurborepoIcon, title: 'Turborepo Monorepo' },
      { Icon: SiNextdotjs, title: 'Next.js' },
      { Icon: SiReact, title: 'React' },
      { Icon: SiTypescript, title: 'TypeScript' },
      { Icon: SiTailwindcss, title: 'Tailwindcss' },
    ]
  },
  web3: {
    id: 'web3',
    title: 'WEB3',
    description: 'Landing page for a web3 website',
    homepage: 'https://web3.neotan.me',
    repoUrl: 'https://github.com/neotan/neotan.me/tree/master/web3',
    imageSrc: '/images/web3.png',
    tags: ['web', 'animation'],
    published: true,
    stackIcons: [
      { Icon: FramerIcon, title: 'Framer Motion Animation' },
      { Icon: TurborepoIcon, title: 'Turborepo Monorepo' },
      { Icon: SiNextdotjs, title: 'Next.js' },
      { Icon: SiReact, title: 'React' },
      { Icon: SiTypescript, title: 'TypeScript' },
      { Icon: SiTailwindcss, title: 'Tailwindcss' },
    ]
  },
}

