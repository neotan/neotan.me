'use client'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { map, pipe, split, values } from 'ramda'
import { formatDate, isNilOrEmpty } from 'utils/helpers'
import type { DynamicRoutePageProps } from 'shared-types'
import mdxData from '../../../public/db.json'
import type { MdxDoc } from '@/types'
import { FlexImage } from '@/components/flex-image'

export default function BlogSlug(
  { params }:
    DynamicRoutePageProps<{ slug: keyof typeof mdxData }>
) {
  const {
    code,
    readTime,
    title,
    date,
    tags,
    cloudinaryImgPubId
  } = mdxData[params.slug] as MdxDoc

  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <>
      <article className="lg:prose-lg prose max-w-none">
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
          {cloudinaryImgPubId && (
            <FlexImage cloudinaryImgPubId={cloudinaryImgPubId} />
          )}
        </header>
        <Component />
      </article>
    </>
  )
}