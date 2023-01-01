import { ReadTimeResults } from 'reading-time'

export interface MdxDoc {
  slug: string
  filePath: string
  readTime: ReadTimeResults
  mdxSource: string
  frontmatter: Frontmatter
  code: string
  content: string
}

export interface Frontmatter {
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
  cloudinaryImgPubId?: Frontmatter['cloudinaryImgPubId']
  date?: Frontmatter['date']
  tags?: Frontmatter['tags']
  title: Frontmatter['title']
  url?: string
  catalog?: string
} & Omit<MdxDoc, 'code' | 'mdxSource' | 'filePath' | 'readTime' | 'frontmatter'>


