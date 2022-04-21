import {useMemo} from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import {deserialize, serialize} from 'superjson'
import formatDate from 'date-fns/format'
import {Image, Transformation, Video} from 'cloudinary-react'
import {getAllMdxs, getMdx} from '~/utils/storage'
import Layout from '~/components/layout'
import {MdxPage} from '~/types/index'
function Blog({mdx}) {
  const {
    code,
    readTime,
    frontmatter: {title, date, tags, mainImgUrl},
  } = deserialize(mdx) as MdxPage
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout>
      <article className="prose prose-gray mx-auto pt-10 dark:prose-invert lg:prose-xl">
        <header>
          <h1>{title}</h1>
          <div className="text-secondary flex items-center opacity-80">
            <time>{formatDate(date, 'yyyy-MM-ii')}</time>
            <i className="mx-2">•</i>
            <time>{readTime.text}</time>
          </div>
          <Image
            className="rounded"
            alt={title}
            cloudName="ntme"
            publicId="v1650489952/blog/71483_2x1_c7611j"
            dpr="auto"
            responsive
            width="auto"
            crop="scale"
            responsiveUseBreakpoints="true"
            fetchFormat="auto"
          />
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
      mdx: serialize(mdx),
    },
  }
}

export default Blog
