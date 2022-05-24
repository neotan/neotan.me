import {path, sortBy} from 'ramda'
import formatDate from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import {getAllLiteMdxs} from '~/utils/storage'
import ArticleCard from '~/components/article-card'
import Layout from '~/components/layout'
import {MdxListItem, MdxPage} from '~/types/index'

export default function Blogs({mdxs}) {
  const posts = sortBy(path(['frontmatter', 'date']))(mdxs) as MdxListItem[]

  return (
    <Layout>
      <div className="grid grid-cols-1 flex-wrap gap-12 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:mx-20 2xl:mx-40">
        {posts
          .reverse()
          .map(
            ({
              slug,
              readTime,
              frontmatter: {date, cloudinaryImgPubId, title},
            }) => {
              return (
                <ArticleCard
                  key={slug}
                  title={title}
                  cloudinaryImgPubId={cloudinaryImgPubId}
                  readTime={readTime.text}
                  slug={`/blogs/${slug}`}
                  createdAt={formatDate(parseISO(date), 'yyyy-MM-dd')}
                />
              )
            },
          )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const mdxs = (await getAllLiteMdxs()) as MdxPage[]
  return {
    props: {
      mdxs,
    },
  }
}
