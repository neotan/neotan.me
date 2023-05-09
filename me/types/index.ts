import { serialize } from 'next-mdx-remote/serialize'

export type BlogSearchIndex = Meta & { content: string }

export type Meta = {
  slug?: string
  title: string
  createdAt: string
  updatedAt?: string
  description?: string
  imgSrc?: string
  readTime?: string
  published?: true
  category: 'til' | 'blog' | 'product'
  tags: string[]
}

export type MdxSource = Awaited<ReturnType<typeof serialize<Record<string, unknown>, Record<string, Meta>>>>

export type PostFile = {
  slug?: string,
  filePath?: string,
  meta?: Meta
  // source?: MdxSource,
  content?: string,
}