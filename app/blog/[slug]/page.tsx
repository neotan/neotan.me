import Link from 'next/link'
import { FaCalendarDay, FaClock } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import Markdown from 'react-markdown'
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import calcReadTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { blogPostsRetrieve } from '@/api'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'



export default async function BlogPostView({ params }: { params: { slug: string } }) {
  const post = await blogPostsRetrieve(params.slug)

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Navbar className='sticky top-0 z-50' />
      <div className="min-h-screen bg-background">
        <header className="flex justify-between bg-secondary/50 py-4 text-primary md:py-12 ">
          <div className="container mx-auto flex max-w-3xl flex-col-reverse px-4 md:flex-row md:px-0">
            <div>
              <h1 className="mb-4 text-4xl font-bold md:text-4xl">{post.title}</h1>
              {post.subtitle && (
                <p className="mb-6 text-xl text-primary/80 md:text-xl">{post.subtitle}</p>
              )}
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="flex items-center text-sm text-primary/80">
                    <FaCalendarDay className="mr-1 size-4" />
                    {post.published_at ? formatDate(post.published_at) : 'Unpublished'}
                    <span className="mx-2">•</span>
                    <FaClock className="mr-1 size-4" />
                    {post.content ? `${calcReadTime(post.content).text}` : 'No content'}
                  </p>
                </div>
              </div>
            </div>
            <Button asChild variant="ghost" className=''>
              <Link href="/#til">
                <IoMdClose className="size-8 fill-muted-foreground" />
              </Link>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <article className="prose prose-zinc mx-auto max-w-3xl dark:prose-invert">
            {post.featured_image_url && (
              <figure className="mb-8">
                <img
                  src={post.featured_image_url}
                  alt={post.featured_image_caption || post.title}
                  className="h-auto w-full rounded-lg shadow-lg"
                />
                {post.featured_image_caption && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {post.featured_image_caption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="mb-12 ">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeRaw,
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'append' }],
                ]}
                components={{
                  code(props) {
                    const { children, className, ...rest } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <Prism
                        {...(rest as SyntaxHighlighterProps)}
                        language={match[1]}
                        style={tomorrow}
                      >
                        {String(children).replace(/\n$/, '')}
                      </Prism>
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {post.content || 'No content available.'}
              </Markdown>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}