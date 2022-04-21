import calcReadingTime, {ReadTimeResults} from 'reading-time'

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
    tags?: Array<string>
    date?: Date
    mainImgUrl?: string
  }
}

export type MdxListItem = Omit<MdxPage, 'code'>

export type GitHubFile = {path: string; content: string}

export {MdxPage, MdxListItem, GitHubFile}
