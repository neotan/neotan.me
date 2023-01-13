import * as React from 'react'
import { pathOr, sortBy, values } from 'ramda'
import { formatDate } from 'utils/helpers'
import type { MdxDoc } from '../../types'
import ArticleCard from '../../components/article-card'
import mdxData from '../../public/db.json'

type Slug = keyof typeof mdxData

export default function Tldr() {
  let posts = sortBy(
    pathOr('', ['frontmatter', 'date']),
    values(mdxData as Record<Slug, MdxDoc>)
  )

  return (
    <main className="blog-page grid grid-cols-1 flex-wrap gap-12 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:mx-20 2xl:mx-40">
      {posts
        .reverse()
        .map(
          ({
            slug,
            readTime,
            frontmatter: { date, cloudinaryImgPubId, title },
          }) => {
            return (
              <ArticleCard
                key={slug}
                title={title || ''}
                cloudinaryImgPubId={cloudinaryImgPubId}
                readTime={readTime?.text}
                slug={`/blog/${slug}`}
                createdAt={formatDate(date || '', 'yyyy-MM-dd')}
              />
            )
          },
        )}
    </main>
  )
}
