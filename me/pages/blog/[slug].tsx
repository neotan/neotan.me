import { CH } from '@code-hike/mdx/components'
import Head from 'next/head'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { keys } from 'ramda'
import React from 'react'
import { deserialize } from 'superjson'
import { formatDate, isNilOrEmpty } from 'utils/helpers'
import Anchor from '../../components/anchor'
import PostLayout from '../../components/post-layout'
import pkgJson from '../../package.json'
import postFiles from '../../public/db.json'
import { compileMDX } from '../../shared/mdx'
import { MdxSource, Meta } from '../../types'

type MdxPageProps = {
  source: MdxSource
  meta: Meta
  filePath: string
}

export default function BlogSlug(props: MdxPageProps) {
  const { source = '', meta, filePath = '' } = props
  const {
    slug,
    title,
    createdAt,
    updatedAt,
    tags,
    imgSrc = '',
    readTime = ''
  } = meta

  const date = updatedAt || createdAt
  return (
    <PostLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <article className="prose max-w-none px-2 text-primary backdrop-blur-lg sm:px-4">
        <header>
          <h1>{title}</h1>
          {!isNilOrEmpty(tags) && (
            <div className="space-x-2">
              {tags.map(tag => (
                <div key={tag} className='badge badge-outline badge-lg'>
                  {tag}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center">
            {
              date && <>
                <time>{formatDate(date)}</time>
                <i className="mx-2">•</i>
              </>
            }
            <time>{readTime}</time>
            <i className="grow" />
            <Anchor className='opacity-0 hover:opacity-100' newWindow href={`${pkgJson.editUrl}/${filePath}`}>Edit</Anchor>
          </div>
          <Image
            src={`${imgSrc}`}
            alt={title}
            priority
            width={1600}
            height={475}
          />
        </header>
        {/* @ts-ignore */}
        <MDXRemote {...source} components={{ CH }} />
      </article>
    </PostLayout>
  )
}

export async function getStaticProps({ params }) {
  //@ts-ignore
  const postFile = deserialize(postFiles)[params.slug]
  return {
    props: {
      source: await compileMDX(postFile),
      meta: postFile.meta,
      filePath: postFile.filePath?.replace(/\\/g, '/'),
    }
  }
}

export const getStaticPaths = async () => {
  const paths = keys(postFiles.json)
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
