import { notFound } from 'next/navigation'

import Link from 'next/link'
import { FaCalendarDay, FaClock } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import calcReadTime from 'reading-time'

import markdownToHtml from '@/lib/markdown'

import { getPostAndMorePosts } from '@/lib/remote-api'
import Navbar from '@/components/navbar'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'


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

  return (
    <div className="min-h-screen bg-background">
      <Navbar className='sticky top-0 z-50' />
      <header className='flex justify-between bg-secondary/50 py-4 text-primary md:py-12'>
        <div className={`
          container mx-auto flex max-w-3xl flex-col-reverse justify-between px-4
          md:flex-row md:px-0
        `}>
          <div>
            <h1 className="mb-4 text-4xl font-bold md:text-4xl">{post.title}</h1>
            <div className="flex items-center space-x-4">
              <div className='flex flex-col gap-2'>
                <p className="font-medium">{post.author?.name}</p>
                <p className="flex items-center text-sm text-primary/80">
                  <FaCalendarDay className="mr-1 size-4" />
                  {post.publishedDate ? formatDate(post.publishedDate) : 'Unpublished'}
                  <span className="mx-2">•</span>
                  <FaClock className="mr-1 size-4" />
                  {post.content ? `${calcReadTime(post.content).text}` : 'No content'}
                </p>
              </div>
            </div>
          </div>
          <Link href="/#til">
            <IoMdClose className='size-8 fill-muted-foreground hover:fill-primary' />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <article className='mx-auto prose max-w-3xl prose-zinc dark:prose-invert'>
          {post.coverImage?.url && (
            <figure className="mb-8">
              <Image
                alt={post.title ?? 'Blog post image'}
                className="h-auto w-full shadow-lg"
                height={1000}
                sizes="(max-width: 768px) 100vw, 50vw"
                src={post.coverImage.url}
                width={1000}

              />
            </figure>
          )}

          <div className="mb-12">
            <div dangerouslySetInnerHTML={{
              __html: await markdownToHtml(post.content ?? '')
            }} />
          </div>
        </article>
      </main>
    </div>
  )
}