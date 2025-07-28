import React from 'react'

import Link from 'next/link'
import { FaCalendarDay, FaGithub, FaRegClock, FaStar } from 'react-icons/fa'
import calcReadTime from 'reading-time'

import Bio from '@/components/bio'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAllPosts, getAllProducts } from '@/lib/remote-api'
import { cn, formatDate } from '@/lib/utils'
import Image from 'next/image'

export default async function Home() {
  const products = await getAllProducts()
  const posts = await getAllPosts()
  const regularProducts = products?.filter(product => !product.featured)
  const featuredProducts = products?.filter(product => product.featured)

  return (
    <>
      <Navbar className='sticky top-0 z-50' />
      <div className={'min-h-screen bg-gradient-to-b from-secondary to-background'}>
        <header className={'container mx-auto hidden max-w-6xl px-4 py-16 text-center md:block'}>
          <Bio className={'opacity-0 sm:px-16 intersect:opacity-100'} />
        </header>

        <main className="container mx-auto space-y-16 px-4 pb-8 lg:px-8">
          <section id="products">
            <h2 className="mb-4 text-2xl font-bold">Products</h2>

            {/* Featured products */}
            {featuredProducts?.map(({
              slug,
              title,
              description,
              link,
              repositoryLink,
              coverImage,
              coverVideo,
              tags = [],
              version,
            }) => {

              return (
                <Card key={slug} className={`
                  group mx-auto mb-8 flex h-full max-w-5xl grid-cols-[15rem_1fr] flex-col-reverse
                  overflow-hidden rounded-none border-muted-foreground/50 opacity-0 shadow-xl
                  transition-transform
                  sm:grid
                  intersect:opacity-100
                `} id='ai-slides'>
                  <CardContent className="flex grow flex-col gap-4 py-4">
                    <CardTitle className={'group relative flex w-fit items-center p-1 text-2xl'}>
                      {link && <Link href={link ?? '#'} target="_blank">{title}</Link>}
                      {version && <Badge className={`
                        ml-2 rounded-2xl bg-muted text-muted-foreground
                      `}>{version}</Badge>}
                      <div className={`
                        absolute bottom-0 left-0 -z-10 h-0 w-full bg-secondary p-0
                        group-hover:h-full
                      `} />
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {tags?.map(icon => (
                        <Badge
                          key={icon}
                          className={'bg-muted text-muted-foreground hover:bg-muted'}
                        >{icon}
                        </Badge>
                      ))}
                    </div>
                    <footer className="flex justify-start gap-2">
                      {repositoryLink && <Button asChild size="icon" variant="ghost">
                        <Link href={repositoryLink} target="_blank">
                          <FaGithub className="size-4" />
                        </Link>
                      </Button>}
                    </footer>
                  </CardContent>
                  <CardHeader className="p-0">
                    {coverImage?.url &&
                      <Image
                        alt={title ?? ''}
                        className={cn('h-72 w-full rounded-none object-cover object-center pb-0')}
                        height={288}
                        src={coverImage?.url}
                        width={1000}
                      />}
                    {coverVideo?.url &&
                      <video autoPlay controls muted className={`
                        w-full rounded-none object-contain object-top pb-0
                      `} src={coverVideo?.url} />
                    }
                  </CardHeader>
                </Card>
              )
            })}

            {/* Regular products */}
            <div className={'grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3'}>
              {regularProducts
                .map((product) => {
                  if (!product) return null

                  const {
                    slug,
                    title,
                    description,
                    link,
                    repositoryLink,
                    coverImage,
                    tags = [],
                  } = product

                  return (
                    <Card key={slug} className={cn(`
                      flex h-full flex-col overflow-hidden rounded-none border-muted-foreground/50
                      shadow-xl transition-transform
                    `)}>
                      <CardHeader className="relative p-0">
                        {coverImage?.url && <Image
                          alt={title ?? ''}
                          className={cn('h-72 w-full rounded-none object-cover object-top pb-0')}
                          height={1000}
                          src={coverImage?.url}
                          width={1000}
                        />}
                        <div className={`
                          absolute bottom-0 flex w-full px-6 py-2 opacity-0 transition-opacity
                          duration-500
                          in-hover:opacity-100
                        `}>
                          {repositoryLink && <Button asChild variant="outline">
                            <Link href={repositoryLink} target="_blank">
                              <FaGithub className="mr-2 size-4" />
                              Code
                            </Link>
                          </Button>}
                        </div>
                      </CardHeader>
                      <CardContent className="flex grow flex-col gap-4 py-4">
                        <CardTitle
                          className={'group relative flex w-fit items-center p-1 text-2xl'}
                        >
                          <Link href={link ?? '#'}>{title}</Link>
                          <div className={`
                            absolute bottom-0 left-0 -z-10 h-0 w-full bg-secondary p-0
                            group-hover:h-full
                          `} />
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {tags?.map(icon => (
                            <Badge key={icon} className={`
                              bg-muted text-muted-foreground
                              hover:bg-muted
                            `}>{icon}</Badge>
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
                <li key={post.slug} className={`
                  group flex flex-col gap-4 border border-secondary bg-card px-4 py-6 opacity-0
                  shadow-lg transition-transform
                  hover:z-20 hover:scale-105 hover:shadow-2xl
                  intersect:opacity-100
                `}>
                  <div className="flex items-start justify-between">
                    <Link className="relative flex p-1" href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-semibold">{post.title}</h2>
                      <div className={`
                        absolute bottom-0 left-0 -z-10 h-0 w-full bg-secondary p-0
                        group-hover:h-full
                      `} />
                    </Link>
                    {post.featured && <FaStar className='min-w-4 text-primary' />}
                  </div>
                  <div className="grow" />
                  <div className={'flex flex-col flex-wrap gap-4 text-sm text-muted-foreground'}>
                    <div className="flex items-center gap-2">
                      <div>{post.author?.name}</div>
                      <Avatar>
                        <AvatarImage src={post.author?.avatar?.url ?? ''} />
                        <AvatarFallback>{post.author?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex gap-4">
                      {post.publishedDate && (
                        <span className="flex items-center gap-1">
                          <FaCalendarDay size={14} />
                          {formatDate(post.publishedDate)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <FaRegClock size={14} />
                        {calcReadTime(post.content ?? '').text}
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
