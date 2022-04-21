import {map, omit, path, pipe, sortBy, values} from 'ramda'
import formatDate from 'date-fns/format'
import {deserialize, serialize} from 'superjson'
import {getAllMdxs} from '~/utils/storage'
import ArticleCard from '~/components/article-card'
import Layout from '~/components/layout'
import {MdxListItem, MdxPage} from '../../types'

export default function Blogs({mdxs}) {
  const posts = pipe(
    deserialize,
    sortBy(path(['frontmatter', 'date'])),
  )(mdxs) as MdxListItem[]

  return (
    <Layout>
      <div className="bg-primary grid grid-cols-1 flex-wrap gap-8 p-4 sm:grid-cols-2 xl:mx-20 xl:grid-cols-3 2xl:mx-40">
        {posts.map(({slug, readTime, frontmatter}) => {
          return (
            <ArticleCard
              key={slug}
              title={frontmatter.title}
              mainImgUrl={
                frontmatter.mainImgUrl ||
                'https://res.cloudinary.com/ntme/image/upload/v1650489952/neotan-me/71483_2x1_c7611j.jpg' ||
                '/images/avatar-icon.svg'
              }
              readTime={readTime.text}
              slug={`blogs/${slug}`}
              createdAt={formatDate(frontmatter.date, 'yyyy-MM-ii')}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const mdxs = (await getAllMdxs()) as Record<string, MdxPage>
  return {
    props: {
      mdxs: pipe(values, map(omit(['code'])), serialize)(mdxs),
    },
  }
}
