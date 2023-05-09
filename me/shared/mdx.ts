import path from 'path'
import { remarkCodeHike } from '@code-hike/mdx'
import theme from "shiki/themes/dark-plus.json"
import { serialize } from 'next-mdx-remote/serialize'
import { PostFile } from '../types'
import { homepage } from '../package.json'

import remarkImages from 'remark-images'
import remarkImgLinks from '@pondorasti/remark-img-links'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeTwemojify from 'rehype-twemojify'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'

export async function compileMDX({ content = '', meta, filePath = '' }: PostFile) {
  const siteUrl = process.env.NODE_ENV === 'production'
    ? homepage
    : 'http://localhost:4000'

  const absolutePath = `${siteUrl}/${path.dirname(filePath)}/`.replace(/\\/g, '/')

  const mdxSource = await serialize(
    content,
    {
      mdxOptions: {
        useDynamicImport: true,
        remarkPlugins: [
          remarkGfm,
          remarkImages,
          [remarkImgLinks, { absolutePath }],
          [remarkEmbedder, { transformers: [oembedTransformer] }],
          [remarkCodeHike, { theme, lineNumbers: true, autoImport: false }]
        ],
        rehypePlugins: [
          // [rehypeTwemojify, { ext: '.svg', size: 'svg' }],
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append" }],
        ],
      },
    }
  )

  return mdxSource
}