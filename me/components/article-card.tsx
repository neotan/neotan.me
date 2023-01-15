import Link from 'next/link'
import { FiImage } from 'react-icons/fi'
import { FlexImage } from './flex-image'

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
    <Link href={slug}>
      <figure
        title={title}
        className="group h-full transform-gpu cursor-pointer overflow-hidden rounded-md bg-secondary shadow-xl transition hover:z-10 sm:hover:scale-105"
      >
        {cloudinaryImgPubId ? (
          <FlexImage
            cloudinaryImgPubId={cloudinaryImgPubId}
            className="rounded-none"
          />
        ) : (
          <FiImage className="stroke-secondary" />
        )}
        <footer className="p-3">
          <h3 className="mt-1 break-all text-2xl">{title}</h3>
          <figcaption className="max-w-md truncate">{description}</figcaption>
          <div className="flex items-center opacity-40 transition group-hover:opacity-100">
            <time title={`Created at ${createdAt}`}>{createdAt}</time>
            <i className="mx-2">•</i>
            <time>{readTime}</time>
          </div>
        </footer>
      </figure>
    </Link>
  )
}

export default ArticleCard
