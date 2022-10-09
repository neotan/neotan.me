import calcReadingTime, { ReadTimeResults } from 'reading-time'

export type MdxPage = {
  code: string
  slug: string
  editLink?: string
  readTime?: ReturnType<typeof calcReadingTime>
  frontmatter: {
    published?: boolean
    draft?: boolean
    title?: string
    description?: string
    catalog?: string
    tags?: Array<string>
    date?: string
    cloudinaryImgPubId?: string
    bannerImgUrl?: string
  }
}

export type MdxListItem = Omit<MdxPage, 'code'>

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
