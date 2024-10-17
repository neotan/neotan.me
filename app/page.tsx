import Link from 'next/link'
import React from 'react'
import { FaCalendarDay, FaExternalLinkAlt, FaGithub, FaRegClock } from 'react-icons/fa'
import calcReadTime from 'reading-time'
import { blogPagesList, blogPostsList } from '@/api'
import Bio from '@/components/bio'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

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
  const pagesData = await blogPagesList()
  const products = Object.values(pagesData?.home?.data as { [key: string]: Product })
  const posts = Object.values(await blogPostsList({ mode: 'cors' }))

  const filteredPosts = posts?.filter((post) => post.status === 'published')

  return (
    <>
      <Navbar className='sticky top-0 z-50' />
      <div className="min-h-screen  bg-gradient-to-b from-secondary to-background">
        <header className="container mx-auto hidden px-4 py-16 text-center md:block">
          <Bio className='sm:px-16' />
        </header>

        <main className="container mx-auto space-y-16 px-4 py-8 lg:px-8">
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
                    <Card key={id} className={cn('hover:shadow-3xl glassmorphism group flex h-full flex-col overflow-hidden rounded-none border-muted-foreground/50 shadow-xl transition-transform hover:z-20 hover:scale-105', className)}>
                      <CardHeader className="relative p-0">
                        <img src={imageSrc} alt={title} className={cn('h-72 w-full rounded-none object-cover object-top pb-0', imgClassName)} />
                        <div className="absolute bottom-0 flex w-full justify-between px-6 py-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <Button asChild size="sm" variant="outline">
                            {homepage && <Link href={homepage} target="_blank">
                              <FaExternalLinkAlt className="mr-2 size-3" />
                              Visit
                            </Link>}
                          </Button>
                          {repoUrl && <Button asChild variant="outline">
                            <Link href={repoUrl} target="_blank">
                              <FaGithub className="mr-2 size-4" />
                              Code
                            </Link>
                          </Button>}
                        </div>
                      </CardHeader>
                      <CardContent className="grow py-4">
                        <CardTitle className="mb-2 text-2xl">{title}</CardTitle>
                        <CardDescription className="mb-4 text-muted-foreground">{description}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {stackIcons?.map(icon => (
                            <span key={icon.iconName} className="flex items-center gap-1" title={icon.title}>
                              <Badge key={icon.title} variant="secondary">{icon.title}</Badge>
                            </span>
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
              {filteredPosts?.map((post) => (
                <li key={post.id} className="rounded-lg border bg-card shadow-lg transition-transform hover:z-20 hover:scale-105 hover:shadow-2xl">
                  <Link href={`/blog/${post.id}`} className="flex flex-col gap-4 px-4 py-6">
                    <h2 className="text-2xl font-semibold">{post.title}</h2>
                    <div className="flex flex-col flex-wrap gap-4 text-sm text-muted-foreground">
                      <div>{post.author || 'Neo'}</div>
                      <div className="flex gap-4">
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <FaCalendarDay size={14} />
                            {new Date(post.published_at).toLocaleDateString()}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FaRegClock size={14} />
                          {calcReadTime(post.content || '').text}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}
