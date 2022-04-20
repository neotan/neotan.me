import {useMemo} from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import {getAllMdxs, getMdx} from 'utils/storage'
import Layout from './../../components/layout'

function Blog(props) {
  console.log(22222, props)
  const {
    mdx: {slug, filePath, frontmatter, code},
  } = props
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout>
      <div className="grid flex-wrap justify-center gap-8 p-5 md:grid-cols-2 xl:grid-cols-3 3xl:flex">
        <article className="prose prose-slate">
          <Component />
        </article>
        <pre>
          <code>{JSON.stringify(frontmatter, null, 2)}</code>
        </pre>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const mdxs = await getAllMdxs()
  const paths = Object.keys(mdxs).map((slug) => ({params: {slug}}))

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
