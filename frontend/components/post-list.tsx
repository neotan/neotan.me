import {forwardRef} from 'react'
import FlipMove from 'react-flip-move'

type TPost = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

function PostCard<TPost>({post: TPost}) {}

type PostListProps = {
  posts: TPost[]
}

const defaultPosts = [
  {
    id: 0,
    title: 'This is blog title',
    author: 'Neo Tan',
    content:
      "Let's build Medium 2.0 with NEXT.JS! (TypeScript, Sanity CMS, React, Tailwind CSS, ISR)",
  },
]

type TGridProps = {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  nested?: boolean
  rowGap?: boolean
  featured?: boolean
}

const Grid = forwardRef<HTMLElement, TGridProps>(function Grid(
  {children, className, as: Tag = 'div', nested, rowGap, featured},
  forwardedRef,
) {
  return (
    <Tag
      className="my-10 flex-wrap bg-primary justify-center px-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex"
      ref={forwardedRef}
    >
      {posts.map(post => {
        return <PostCard key={post.id} {...post} />
      })}
      <div />
    </Tag>
  )
})

export default Grid
