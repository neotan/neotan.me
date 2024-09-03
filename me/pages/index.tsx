'use client'
import Image from 'next/image'
import Link from 'next/link'
import { values } from 'ramda'
import React, { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FaGithub, FaSlackHash } from 'react-icons/fa'
import {
  SiAlgolia,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiWebassembly
} from 'react-icons/si'
import { SiVisualstudiocode } from 'react-icons/si'
import { cn } from 'utils/helpers'
import Bio from '../components/bio'
import DefaultLayout from '../components/default-layout'
import FramerIcon from '../icons/framer-icon'
import PlasmoIcon from '../icons/plasmo-icon'
import TurborepoIcon from '../icons/turborepo-icon'

export default function HomeIndex() {

  return (
    <DefaultLayout>
      <Bio className='sm:px-16' />
      <main key='projects' className='relative flex flex-col gap-8'
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
            <div key={id} id={id} className='group card px-2 sm:px-8'>
              <div className="invisible absolute -left-2 top-0 flex flex-col gap-2 group-hover:visible">
                <Link href={'#' + id}>
                  <FaSlackHash className='hidden h-9 w-9 rounded-full fill-secondary p-1 shadow-lg transition-transform hover:scale-125 sm:block' />
                </Link>
                {repoUrl && <Link href={repoUrl}>
                  <FaGithub className='hidden h-9 w-9 rounded-full fill-secondary p-1 shadow-lg transition-transform hover:scale-125 sm:block' />
                </Link>}
              </div>
              <div />
              <div className="glassmorphism card-body h-full  gap-8 rounded-2xl !bg-secondary/30 p-4  shadow-lg shadow-black/40 sm:p-8">
                <Link href={homepage} target='_blank' rel="noopener noreferrer">
                  <Image
                    className={cn('rounded-3xl shadow-lg transition-transform hover:scale-105', className)}
                    alt={title}
                    src={imageSrc}
                    width={1600}
                    height={475}
                  />
                </Link>
                <div className='flex flex-col gap-3 group-hover:text-primary' >
                  <div className="flex-wrap text-center text-lg">{description}</div>
                  <div className="flex w-full flex-wrap items-center justify-center gap-4 text-primary/70 transition-transform hover:scale-125">{
                    stackIcons.map(({ Icon, title }) => (
                      <div key={title} className="rounded-full bg-secondary/20 p-2  transition-transform hover:scale-150" title={title} >
                        <Icon className='h-5 w-5' title={title} />
                      </div>
                    ))
                  }</div>
                </div>
              </div>
            </div>
          )
        })}
      </main>
    </DefaultLayout>
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
  'github-compare-online': {
    id: 'github-compare-online',
    title: 'Compare Github branches, commits, tags and hashes online.',
    description: <><strong className='font-semibold'>Chrome extension: </strong>Find and Compare GitHub commits became much easier.</>,
    homepage: 'https://chrome.google.com/webstore/detail/github-compare-online/dglncilbcfbjkdpiabohoofgkfabhpab',
    repoUrl: 'https://github.com/neotan/chrome-extension-github-compare-online',
    imageSrc: '/images/compare-github.png',
    tags: ['chrome-extension', 'plasmo', 'tailwindcss', 'github'],
    published: true,
    stackIcons: [
      { Icon: PlasmoIcon, title: 'Plasmo' },
      { Icon: SiReact, title: 'React' },
      { Icon: SiTypescript, title: 'TypeScript' },
      { Icon: SiTailwindcss, title: 'Tailwindcss' },
    ],
    className: 'h-64 object-cover'

  },
  hash: {
    id: 'hash',
    title: 'Hash',
    description: 'Generate text/file (up to 10GB) hash with WASM locally',
    homepage: 'http://hash.neotan.me',
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

