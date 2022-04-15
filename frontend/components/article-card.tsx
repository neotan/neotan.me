import {forwardRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import formatDate from 'date-fns/format'
import {EyeIcon} from '@heroicons/react/outline'

type ArticleProps = {
  title?: string
  overview?: string
  author?: string
  imgUrl?: string
  url?: string
  viewCount?: number
  updatedAt?: string
  createdAt?: string
}

function ArticleCard({
  title = 'Untitled Post',
  overview = 'No overview',
  author,
  imgUrl,
  url = '/',
  viewCount = 0,
  updatedAt,
  createdAt,
}: ArticleProps) {
  return (
    <Link passHref href={url}>
      <figure
        title={title}
        className="bg-secondary group cursor-pointer rounded-md p-2 shadow-lg shadow-black transition hover:z-50 sm:hover:scale-105"
      >
        <Image
          layout="responsive"
          alt={title}
          src={imgUrl}
          height={1080}
          width={1920}
        />
        <footer className="p-2">
          <h3 className="mt-1 text-2xl">{title}</h3>
          <figcaption className="text-secondary max-w-md truncate">
            {overview}
          </figcaption>
          <div className="text-secondary flex items-center opacity-0 transition group-hover:opacity-100">
            <time title={`Created at ${createdAt}`}>{createdAt}</time>
            <i className="mx-2">•</i>
            <EyeIcon className="mr-1 h-5" />
            {viewCount}
          </div>
        </footer>
      </figure>
    </Link>
  )
}

// For development purpose
export function CardsForDev() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('<CardsForDev/> should only be used during development!')
  }
  return (
    <div className="my-10 flex-wrap justify-center gap-8 px-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex">
      {Array.from({length: 12}).map((_, i) => {
        const post = {
          title: 'Untitled Post',
          overview: 'No overview '.repeat(6),
          author: 'Unkown Author',
          imgUrl: '/images/avatar-icon.svg',
          url: '/blogs',
          viewCount: 0,
          updatedAt: formatDate(new Date(), 'yyyy-MM-ii'),
          createdAt: formatDate(new Date(), 'yyyy-MM-ii'),
        }
        return <ArticleCard key={i} {...post} />
      })}
    </div>
  )
}
export default ArticleCard
