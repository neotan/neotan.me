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
import mdxData from '@/public/db.json'
import CloudinaryIcon from '@/icons/cloudinary-icon'
import TurborepoIcon from '@/icons/turborepo-icon'
import FramerIcon from '@/icons/framer-icon'
import { FlexImage } from '@/components/flex-image'
import { MdxDoc } from '@/types'
import NavTabs from '@/components/nav-tabs'
import Bio from '@/components/bio'
import Navbar from '@/components/navbar'

type Slug = keyof typeof mdxData;

export default function HomeIndex() {

  return (
    <>
      <Navbar className='px-0 sm:px-10' >
        <Link href='/'>
          <Image
            className='rounded-full shadow-3xl'
            alt='Avatar'
            src='/images/avatar-icon.png'
            width={60}
            height={60}
          />
        </Link>
      </Navbar>
      <Bio />
      <NavTabs />
      <section key='projects' className='flex flex-col gap-4'
      >
        {values(projects).map(({
          id,
          title,
          description,
          homepage,
          imageSrc,
          tags,
          published,
          stackIcons = [],
          className
        }: Project) => {
          if (!published) return null
          return (
            <div key={id} className='card bg-accent/20 group h-full rounded-3xl'>
              <div className="card-body gap-8 rounded-2xl p-4 sm:p-8">
                <Link href={homepage} target='_blank' rel="noopener noreferrer">
                  <Image
                    className={cn('rounded-3xl shadow-3xl transition-transform hover:scale-105', className)}
                    alt={title}
                    src={imageSrc}
                    width={820}
                    height={475}
                  />
                </Link>
                <div className='text-secondary group-hover:text-primary flex flex-col gap-3' >
                  <div className="flex-wrap text-center text-lg">{description}</div>
                  <div className="flex w-full items-center justify-center gap-4 transition-transform hover:scale-125">{
                    stackIcons.map(({ Icon, name }) => (
                      <div key={name} className="bg-secondary/20 rounded-full p-2  transition-transform hover:scale-150" title={name} >
                        <Icon className='h-5 w-5' title={name} />
                      </div>
                    ))
                  }</div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
      <section key='tldr' className='grid grid-cols-1 gap-6 sm:grid-cols-2'
      >
        {values(mdxData as Record<Slug, MdxDoc>)
          .sort((right, left) =>
            String(left?.date ?? '').localeCompare(String(right?.date ?? '')))
          .map(({
            slug,
            title,
            cloudinaryImgPubId = '',
            description,
            published
          }) => {
            if (!published) return null

            return (
              <Link key={slug} href={`/blog/${slug}`}>
                <div className='card h-full shadow-2xl'>
                  <div className="card-body rounded-2xl p-4 sm:p-8">
                    <figure className='grow'>
                      {cloudinaryImgPubId.length > 10 // length of Cloudinary Account
                        ? <FlexImage
                          className='h-52 rounded-b-none object-cover'
                          cloudinaryImgPubId={cloudinaryImgPubId} />
                        : <div className='items-center justify-center text-7xl'>{cloudinaryImgPubId}</div>
                      }
                    </figure>
                    <div className='card-actions'>
                      <h2 className="">{title}</h2>
                      {/* <div className="">{description}</div> */}
                    </div>
                  </div>
                </div>
              </Link>
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
  stackIcons?: { Icon: IconType, name: string }[]
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
      { Icon: SiAlgolia, name: 'Algolia Instant Search' },
      { Icon: CloudinaryIcon, name: 'Cloudinary Media CDN' },
      { Icon: TurborepoIcon, name: 'Turborepo Monorepo' },
      { Icon: SiNextdotjs, name: 'Next.js' },
      { Icon: SiReact, name: 'React' },
      { Icon: SiTypescript, name: 'TypeScript' },
      { Icon: SiTailwindcss, name: 'TailwindCSS' },
    ]

  },
  'neotan.vscode-auto-restart-typescript-eslint-servers': {
    id: 'neotan.vscode-auto-restart-typescript-eslint-servers',
    title: 'Auto Restart TypeScript / ESLint Servers',
    description: <><strong className='font-semibold'>VS Code Extension:</strong> Restart TypeScript or ESLint server automatically if monitored configuration or files changed.</>,
    homepage: 'https://marketplace.visualstudio.com/items?itemName=neotan.vscode-auto-restart-typescript-eslint-servers',
    imageSrc: 'https://raw.githubusercontent.com/neotan/vscode-auto-restart-typescript-eslint-servers/master/images/_featured.png',
    tags: ['vscode', 'extension'],
    published: true,
    stackIcons: [
      { Icon: SiVisualstudiocode, name: 'VS Code Extension' },
      { Icon: SiTypescript, name: 'TypeScript' },
    ],
    className: 'h-60 object-cover'

  },
  hash: {
    id: 'hash',
    title: 'Hash',
    description: 'Generate text/file (up to 10GB) hash with WASM locally',
    homepage: 'http://hash.npmhub.net',
    imageSrc: '/images/hash.png',
    tags: ['web'],
    published: true,
    stackIcons: [
      { Icon: SiWebassembly, name: 'Webassembly' },
      { Icon: TurborepoIcon, name: 'Turborepo Monorepo' },
      { Icon: SiNextdotjs, name: 'Next.js' },
      { Icon: SiReact, name: 'React' },
      { Icon: SiTypescript, name: 'TypeScript' },
      { Icon: SiTailwindcss, name: 'TailwindCSS' },
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
      { Icon: FramerIcon, name: 'Framer Motion Animation' },
      { Icon: TurborepoIcon, name: 'Turborepo Monorepo' },
      { Icon: SiNextdotjs, name: 'Next.js' },
      { Icon: SiReact, name: 'React' },
      { Icon: SiTypescript, name: 'TypeScript' },
      { Icon: SiTailwindcss, name: 'TailwindCSS' },
    ]
  },
}

