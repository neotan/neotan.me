import {useMemo} from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import {FlexImage} from '~/components/image'
import {getAllMdxs, getMdx} from '~/utils/storage'
import {formatDate} from '~/utils/utils'
import Layout from '~/components/layout'
import {MdxPage} from '~/types/index'

function Blog({mdx}) {
  const {
    code,
    readTime,
    frontmatter: {title, date, tags, cloudinaryImgPubId},
  } = mdx as MdxPage
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout>
      <article className="prose prose-slate mx-auto pt-10 dark:prose-invert lg:prose-xl">
        <header>
          <h1 className="break-all">{title}</h1>
          <div className="text-secondary flex items-center opacity-80">
            <time>{formatDate(date)}</time>
            <i className="mx-2">•</i>
            <time>{readTime.text}</time>
          </div>
          <FlexImage cloudinaryImgPubId={cloudinaryImgPubId} />
        </header>
        <Component />
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
      mdx,
    },
  }
}

export default Blog
