import Link from 'next/link'
import {PhotographIcon} from '@heroicons/react/outline'
import {FlexImage} from './image'

type ArticleProps = {
  title: string
  description?: string
  readTime?: string
  cloudinaryImgPubId?: string
  slug?: string
  createdAt?: string
  updatedAt?: string
}

function ArticleCard({
  title,
  description,
  readTime,
  cloudinaryImgPubId = 'v1650489952/blog/71483_2x1_c7611j',
  slug = '/',
  updatedAt,
  createdAt,
}: ArticleProps) {
  return (
    <figure
      title={title}
      className="bg-secondary shadow-primary group cursor-pointer rounded-md p-3 transition hover:z-10 hover:shadow-2xl sm:hover:scale-105"
    >
      <Link href={slug}>
        <a>
          {cloudinaryImgPubId ? (
            <FlexImage cloudinaryImgPubId={cloudinaryImgPubId} />
          ) : (
            <PhotographIcon />
          )}
          <footer className="p-2">
            <h3 className="mt-1 text-2xl">{title}</h3>
            <figcaption className="text-secondary max-w-md truncate">
              {description}
            </figcaption>
            <div className="text-secondary flex items-center opacity-0 transition group-hover:opacity-100">
              <time title={`Created at ${createdAt}`}>{createdAt}</time>
              <i className="mx-2">•</i>
              <time>{readTime}</time>
            </div>
          </footer>
        </a>
      </Link>
    </figure>
  )
}

export default ArticleCard
