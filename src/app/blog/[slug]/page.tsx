import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { FaArrowLeft, FaCalendarDay, FaRegClock } from 'react-icons/fa'
import calcReadTime from 'reading-time'

import Navbar from '@/components/navbar'
import markdownToHtml from '@/lib/markdown'
import { getPostAndMorePosts } from '@/lib/remote-api'
import { cn, formatDate } from '@/lib/utils'

type Params = {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostView(props: Params) {
  const { slug } = await props.params
  const { post } = await getPostAndMorePosts(slug)

  if (!post) {
    notFound()
  }

  const readTime = post.content ? calcReadTime(post.content).text : 'No content'

  return (
    <div className="min-h-screen bg-[#070707]">
      {/* Navbar */}
      <Navbar className="sticky top-0 z-50" />

      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className={cn(
          'absolute top-0 left-1/4 size-[600px] -translate-x-1/2',
          'rounded-full bg-primary/[0.03] blur-3xl'
        )} />
        <div className={cn(
          'absolute right-1/4 bottom-1/3 size-[400px] translate-x-1/2',
          'rounded-full bg-accent/[0.03] blur-3xl'
        )} />
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
      </div>

      {/* Header Section */}
      <header className="relative z-10 border-b border-[#232323]">
        <div className="container mx-auto max-w-4xl px-6 py-12! md:py-20">
          {/* Back link */}
          <Link
            className={cn(
              'group mb-8 inline-flex items-center gap-2',
              'text-sm font-medium text-muted-foreground',
              'transition-colors duration-200 hover:text-foreground'
            )}
            href="/#til"
          >
            <FaArrowLeft className={cn(
              'size-3 transition-transform duration-200',
              'group-hover:-translate-x-1'
            )} />
            <span>Back to Home</span>
          </Link>

          {/* Category label */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs font-medium tracking-[0.1em] text-accent uppercase">
              / TIL
            </span>
          </div>

          {/* Title */}
          <h1 className={cn(
            'mb-6 text-3xl font-bold tracking-tight text-foreground',
            'sm:text-4xl md:text-5xl'
          )}>
            {post.title}
          </h1>

          {/* Meta information */}
          <div className={cn(
            'flex flex-wrap items-center gap-4 text-sm text-muted-foreground',
            'md:gap-6'
          )}>
            {post.author?.name && (
              <span className="font-medium text-foreground/80">
                {post.author.name}
              </span>
            )}
            {post.publishedDate && (
              <span className="flex items-center gap-1.5">
                <FaCalendarDay className="size-3.5" />
                {formatDate(post.publishedDate)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <FaRegClock className="size-3.5" />
              {readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto max-w-4xl px-6 py-12 md:py-16">
        <article>
          {/* Cover Image */}
          {post.coverImage?.url && (
            <figure className={cn(
              'relative mb-12 overflow-hidden',
              'rounded-xs border-[0.5px] border-[#323232]'
            )}>
              <Image
                priority
                alt={post.title ?? 'Blog post image'}
                className="h-auto w-full object-cover"
                height={1000}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                src={post.coverImage.url}
                width={1000}
              />
              {/* Subtle gradient overlay */}
              <div className={cn(
                'pointer-events-none absolute inset-0',
                'bg-gradient-to-t from-[#070707]/20 to-transparent'
              )} />
            </figure>
          )}

          {/* Article Content */}
          <div className={cn(
            'prose prose-lg max-w-none',
            'prose-zinc dark:prose-invert',
            // Headings
            'prose-headings:font-bold prose-headings:tracking-tight',
            'prose-headings:text-foreground',
            'prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b',
            'prose-h2:border-[#232323] prose-h2:pb-4 prose-h2:text-2xl',
            'prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-xl',
            // Paragraphs
            'prose-p:leading-relaxed prose-p:font-light prose-p:text-foreground/80',
            // Links
            'prose-a:text-primary prose-a:no-underline',
            'prose-a:transition-colors prose-a:duration-200',
            'hover:prose-a:text-primary/80',
            // Code
            'prose-code:rounded-xs',
            'prose-code:px-1.5 prose-code:py-0.5',
            'prose-code:text-foreground/90',
            'prose-code:before:content-none prose-code:after:content-none',
            'prose-pre:border prose-pre:border-[#232323] prose-pre:bg-[#151515]',
            // Blockquotes
            'prose-blockquote:border-l-primary prose-blockquote:bg-[#151515]/50',
            'prose-blockquote:py-1 prose-blockquote:pl-6 prose-blockquote:not-italic',
            // Lists
            'prose-li:font-light prose-li:text-foreground/80',
            'prose-ol:list-decimal prose-ul:list-disc',
            // Strong/Bold
            'prose-strong:font-semibold prose-strong:text-foreground',
            // Images within content
            'prose-img:rounded-xs prose-img:border prose-img:border-[#232323]'
          )}>
            <div dangerouslySetInnerHTML={{
              __html: await markdownToHtml(post.content ?? '')
            }} />
          </div>
        </article>

        {/* Divider */}
        <div className="my-16 h-px divider-gradient" />

        {/* Footer navigation */}
        <div className="flex justify-center">
          <Link
            className={cn(
              'group inline-flex items-center gap-3 px-6 py-3',
              'rounded-xs border-[0.5px] border-[#323232] bg-[#151515]',
              'text-sm font-medium text-muted-foreground',
              'transition-all duration-300',
              'hover:border-[#3F3F46] hover:bg-[#1A1A1E] hover:text-foreground'
            )}
            href="/#til"
          >
            <FaArrowLeft className={cn(
              'size-3.5 transition-transform duration-200',
              'group-hover:-translate-x-1'
            )} />
            <span>Back to all posts</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
