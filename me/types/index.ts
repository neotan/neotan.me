import { ReadTimeResults } from 'reading-time'

export interface MdxDoc {
  slug: string
  filePath: string
  readTime: ReadTimeResults
  mdxSource: string
  code: string
  content: string

  // frontmatter
  title: string
  published?: boolean
  tags?: string
  date?: Date | string | number
  cloudinaryImgPubId?: string
  catalog?: string
  description?: string
}

export type BlogSearchIndex = {
  description?: string
  url?: string
  catalog?: string
  published?: boolean
} & Omit<MdxDoc, 'code' | 'mdxSource' | 'filePath' | 'readTime'>


