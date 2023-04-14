import { getMDXComponent } from 'mdx-bundler/client'
import { useRouter } from 'next/router'
import { keys, map, pipe, split } from 'ramda'
import React, { useMemo } from 'react'
import type { DynamicRoutePageProps } from 'shared-types'
import { formatDate, isNilOrEmpty } from 'utils/helpers'
import { FlexImage } from '../../../components/flex-image'
import NestedLayout from '../../../components/nested-layout'
import mdxData from '../../../public/db.json'
import { MIN_CLOUDINARY_ACCOUNT_LENGTH } from '../../../shared/constants'
import type { MdxDoc } from '../../../types'

export default function BlogSlug(
  { params }:
    DynamicRoutePageProps<{ slug: keyof typeof mdxData }>
) {
  const router = useRouter()
  const {
    code,
    readTime,
    title = '',
    date,
    tags,
    cloudinaryImgPubId = ''
  } = mdxData[router.query.slug as string] as MdxDoc

  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <NestedLayout>
      <article className="prose max-w-none px-2 text-primary backdrop-blur-lg lg:prose-lg sm:px-4">
        <header>
          <h1>{title || 'Untitled'}</h1>
          {!isNilOrEmpty(tags) && (
            <div className="space-x-2">
              {pipe(
                split(/[,\s]/),
                map(tag => (
                  <div className='badge-outline badge badge-lg'>
                    {tag}
                  </div>
                )),
              )(tags || '')}
            </div>
          )}
          <div className="flex items-center opacity-80">
            {date && <time>{formatDate(date)}</time>}
            {date && <i className="mx-2">•</i>}
            {readTime?.text && <time>{readTime.text}</time>}
          </div>
          {cloudinaryImgPubId.length > MIN_CLOUDINARY_ACCOUNT_LENGTH ? (
            <FlexImage cloudinaryImgPubId={cloudinaryImgPubId} />
          ) : <div className='flex items-center justify-center p-4 text-7xl sm:p-8'>{cloudinaryImgPubId}</div>}
        </header>
        <Component />
      </article>
    </NestedLayout>
  )
}

export function getStaticPaths() {
  const paths = keys(mdxData).map(slug => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  return {
    props: {
      slug,
    },
  }
}