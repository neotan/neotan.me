import { path, pipe, sortBy, values } from 'ramda'
import { formatDate } from '~/utils/helpers'
import ArticleCard from '~/components/article-card'
import { DefaultLayout } from '~/components/layouts'
import { MdxListItem } from '~/types'
import mdxData from 'public/db.json'

export default function Blog() {
  const posts = pipe(
    values,
    sortBy(path(['frontmatter', 'date'])),
  )(mdxData) as MdxListItem[]

  return (
    <DefaultLayout>
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
                  title={title}
                  cloudinaryImgPubId={cloudinaryImgPubId}
                  readTime={readTime.text}
                  slug={`/blog/${slug}`}
                  createdAt={formatDate(date, 'yyyy-MM-dd')}
                />
              )
            },
          )}
      </main>
    </DefaultLayout>
  )
}
