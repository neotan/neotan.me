import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { keys, map, pipe, split } from 'ramda'
import { Badge } from 'react-daisyui'
import { FlexImage } from '~/components/flex-image'
import { formatDate, isNilOrEmpty } from '~/utils/helpers'
import { DefaultLayout } from '~/components/layouts'
import { MdxPage } from '~/types'
import mdxData from 'public/db.json'

function Slug({ slug }) {
  const {
    code,
    readTime,
    frontmatter: { title, date, tags, cloudinaryImgPubId },
  } = mdxData[slug] as MdxPage

  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <DefaultLayout>
      <article className="article-page prose prose-slate mx-auto mb-40 p-3 lg:prose-xl">
        <header>
          <h1 className="break-all">{title || 'Untitled'}</h1>
          {!isNilOrEmpty(tags) && (
            <div className="space-x-2">
              {pipe(
                split(/[,\s]/),
                map(tag => (
                  <Badge size="lg" variant="outline">
                    {tag}
                  </Badge>
                )),
              )(tags)}
            </div>
          )}
          <div className="flex items-center opacity-80">
            {date && <time>{formatDate(date)}</time>}
            {date && <i className="mx-2">•</i>}
            {readTime.text && <time>{readTime.text}</time>}
          </div>
          {cloudinaryImgPubId && (
            <FlexImage cloudinaryImgPubId={cloudinaryImgPubId} />
          )}
        </header>
        <Component />
      </article>
    </DefaultLayout>
  )
}

export function getStaticPaths() {
  const paths = keys(mdxData).map(slug => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      slug,
    },
  }
}

export default Slug
