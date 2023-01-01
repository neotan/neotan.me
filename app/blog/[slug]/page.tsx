"use client"

import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { map, pipe, split } from 'ramda'
import { Badge } from 'react-daisyui'
import { formatDate, isNilOrEmpty } from 'utils/helpers'
import type { DynamicRoutePageProps } from 'shared-types'
import mdxData from 'public/db.json'
import type { MdxDoc } from '@/types'
import { FlexImage } from '@/components/flex-image'

export default function TldrSlug({ params }:
  DynamicRoutePageProps<{ slug: keyof typeof mdxData }>) {
  const {
    code,
    readTime,
    frontmatter: { title, date, tags, cloudinaryImgPubId },
  } = mdxData[params.slug] as MdxDoc

  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <article className="article-page prose-slate lg:prose-xl prose mx-auto mb-40 p-3">
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
  )
}
