import {useMemo} from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import {deserialize, serialize} from 'superjson'
import formatDate from 'date-fns/format'
import {getAllMdxs, getMdx} from '~/utils/storage'
import Layout from '~/components/layout'
import {MdxPage} from '~/types/index'

function Blog({mdx}) {
  const {
    code,
    readTime,
    frontmatter: {title, date, tags},
  } = deserialize(mdx) as MdxPage
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout>
      <article className="prose prose-gray mx-auto dark:prose-invert lg:prose-xl">
        <h1>{title}</h1>
        <time>{formatDate(date, 'yyyy-MM-ii')}</time>
        <time>{readTime.text}</time>
        <p>
          <Component />
        </p>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // TODO: a simple & small DB may be required for better performance while processing massive MDX fils
  const mdxs = await getAllMdxs()
  const paths = Object.keys(mdxs).map(slug => ({params: {slug}}))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params: {slug}}) {
  const mdx = await getMdx(slug)
  return {
    props: {
      mdx: serialize(mdx),
    },
  }
}

export default Blog
