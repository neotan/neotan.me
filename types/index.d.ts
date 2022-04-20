import calcReadingTime, {ReadTimeResults} from 'reading-time'

type MdxPage = {
  code: string
  slug: string
  editLink?: string
  readTime?: ReturnType<typeof calcReadingTime>
  frontmatter: {
    archived?: boolean
    draft?: boolean
    title?: string
    description?: string
    meta?: {
      keywords?: Array<string>
      [key as string]: unknown
    }
    categories: Array<string>
    tags: Array<string>
    createdAt: string
    updatedAt: string
  }
}

type MdxListItem = Omit<MdxPage, 'code'>

type GitHubFile = {path: string; content: string}

export {MdxPage, MdxListItem, GitHubFile}
