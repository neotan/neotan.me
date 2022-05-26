import Link from 'next/link'
import {PhotographIcon} from '@heroicons/react/outline'
import {FlexImage} from './flex-image'

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
  cloudinaryImgPubId,
  slug = '/',
  updatedAt,
  createdAt,
}: ArticleProps) {
  return (
    <figure
      title={title}
      className="bg-secondary shadow-primary group cursor-pointer rounded-md p-3 transition hover:z-10 sm:hover:scale-105"
    >
      <Link href={slug}>
        <a>
          {cloudinaryImgPubId ? (
            <FlexImage cloudinaryImgPubId={cloudinaryImgPubId} />
          ) : (
            <PhotographIcon className="stroke-secondary" />
          )}
          <footer className="p-2">
            <h3 className="mt-1 break-all text-2xl">{title}</h3>
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
