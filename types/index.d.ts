import calcReadingTime, { ReadTimeResults } from 'reading-time'

export type MdxPage = {
  code: string
  content?: string
  slug: string
  editLink?: string
  filePath?: string
  readTime?: ReturnType<typeof calcReadingTime>
  frontmatter: {
    published?: boolean
    draft?: boolean
    title?: string
    description?: string
    catalog?: string
    tags?: string
    date?: string
    cloudinaryImgPubId?: string
    bannerImgUrl?: string
  }
}

export type MdxListItem = Omit<MdxPage, 'code'>

export type BlogSearchIndex = {
  cloudinaryImgPubId?: string
  content?: string
  date?: string
  description?: string
  slug: string
  tags?: string
  title: string
  url: string
}

export type GitHubFile = { path: string; content: string }

export type SvgIconProps = {
  size?: number
  title?: string
  className?: string
}

export interface BaseProps<T> {
  children?: React.ReactNode
  className?: string
  rootProps?: React.ComponentPropsWithoutRef<T>
}

export { MdxPage, MdxListItem, GitHubFile }
