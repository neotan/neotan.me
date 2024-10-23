import { Link } from 'next-view-transitions'
import React from 'react'
import { FaCalendarDay, FaGithub, FaRegClock, FaStar } from 'react-icons/fa'
import calcReadTime from 'reading-time'
import { blogPagesList, blogPostsList } from '@/api'
import Bio from '@/components/bio'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatDate } from '@/lib/utils'

type Product = {
  id: string;
  title: string;
  tags: string[];
  imageSrc: string;
  description: string;
  homepage: string;
  repoUrl: string;
  published: boolean;
  ordering: number;
  stackIcons: { iconName: string, title: string }[];
  className?: string;
  imgClassName?: string;
}

export default async function Home() {
  const pagesData = await blogPagesList({ searchParams: { slug: 'home' } })
  const products = Object.values(pagesData?.[0]?.data as { [key: string]: Product })
  const posts = await blogPostsList({ searchParams: { status: 'published' } })

  return (
    <>
      <Navbar className='sticky top-0 z-50' />
      <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
        <header className="container mx-auto hidden max-w-6xl px-4 py-16 text-center md:block">
          <Bio className='intersect-once intersect-half opacity-0 intersect:animate-fade-down intersect:opacity-100 sm:px-16' />
        </header>

        <main className="container mx-auto space-y-16 px-4 pb-8 lg:px-8">
          <section id="products">
            <h2 className="mb-4 text-2xl font-bold">Products</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
              {products
                ?.filter(product => product.published)
                .sort((right, left) => right.ordering - left.ordering)
                .map((product) => {
                  const {
                    id,
                    title,
                    description,
                    homepage,
                    repoUrl,
                    imageSrc,
                    stackIcons = [],
                    className,
                    imgClassName,
                  } = product

                  return (
                    <Card key={id} className={cn('intersect-once intersect-half hover:shadow-3xl glassmorphism group flex h-full flex-col overflow-hidden rounded-none border-muted-foreground/50 opacity-0 shadow-xl transition-transform intersect:animate-fade-up intersect:opacity-100', className)}>
                      <CardHeader className="relative p-0">
                        <img src={imageSrc} alt={title} className={cn('h-72 w-full rounded-none object-cover object-top pb-0', imgClassName)} />
                        <div className="absolute bottom-0 flex w-full px-6 py-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {repoUrl && <Button asChild variant="outline">
                            <Link href={repoUrl} target="_blank">
                              <FaGithub className="mr-2 size-4" />
                              Code
                            </Link>
                          </Button>}
                        </div>
                      </CardHeader>
                      <CardContent className="flex grow flex-col gap-4 py-4">
                        <CardTitle className="group relative flex w-fit items-center p-1 text-2xl">
                          <Link href={homepage}>{title}</Link>
                          <div className="absolute bottom-0 left-0 -z-10 h-0 w-full bg-secondary p-0 animate-duration-150 group-hover:h-full group-hover:animate-flip-up" />
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">{description}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {stackIcons?.map(icon => (
                            <Badge key={icon.title} className='bg-muted text-muted-foreground hover:bg-muted'>{icon.title}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </section>
          <section id="til">
            <h2 className="mb-4 text-2xl font-bold">Today I learned</h2>
            <ul className="grid grid-cols-1 gap-0 lg:grid-cols-3">
              {posts?.map((post) => (
                <li key={post.id} className="intersect-once intersect-half group flex flex-col gap-4 border border-secondary bg-card px-4 py-6 opacity-0 shadow-lg transition-transform intersect:animate-fade-up intersect:opacity-100 hover:z-20 hover:scale-105 hover:shadow-2xl">
                  <div className=" flex items-start justify-between">
                    <Link href={`/blog/${post.slug}`} className="relative flex p-1">
                      <h2 className="text-2xl font-semibold">{post.title}</h2>
                      <div className="absolute bottom-0 left-0 -z-10 h-0 w-full bg-secondary p-0 animate-duration-150 group-hover:h-full group-hover:animate-flip-up" />
                    </Link>
                    {post.featured && <FaStar className='min-w-4 text-primary' />}
                  </div>
                  <div className="flex flex-col flex-wrap gap-4 text-sm text-muted-foreground">
                    <div>{post.author || 'Neo'}</div>
                    <div className="flex gap-4">
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <FaCalendarDay size={14} />
                          {formatDate(post.published_at)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <FaRegClock size={14} />
                        {calcReadTime(post.content || '').text}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <Footer className='container mx-auto' />
    </>
  )
}
