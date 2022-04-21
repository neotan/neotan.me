import {keys, map, pipe, prop, sortBy, values} from 'ramda'
import formatDate from 'date-fns/format'
import {getAllMdxs, getMdx} from 'utils/storage'
import ArticleCard from '@/components/article-card'
import Layout from '@/components/layout'

export default function Blogs({mdxs}) {
  const posts = pipe(values, sortBy(prop('date')))(mdxs)
  console.log({posts})
  return (
    <Layout>
      <div className="bg-primary grid grid-cols-1 flex-wrap gap-8 p-4 sm:grid-cols-2 xl:mx-20 xl:grid-cols-3 2xl:mx-40">
        {posts.map(({title, slug, date, readTime, frontmatter}) => {
          console.log({title, slug, date, readTime})
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
  const mdxs = await getAllMdxs()

  return {
    props: {
      mdxs,
    },
  }
}
