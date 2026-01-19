import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { FaCalendarDay, FaGithub, FaRegClock, FaStar } from 'react-icons/fa'
import calcReadTime from 'reading-time'

import Bio from '@/components/bio'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllPosts, getAllProducts } from '@/lib/remote-api'
import { cn, formatDate } from '@/lib/utils'

export default async function Home() {
  const products = await getAllProducts()
  const posts = await getAllPosts()
  const regularProducts = products?.filter(product => !product.featured)
  const featuredProducts = products?.filter(product => product.featured)

  return (
    <>
      <Navbar className='sticky top-0 z-50 border-b border-border/20 bg-background/90 backdrop-blur-xl' />

      <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_80%),radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.08),transparent_40%)]' />

        <header className='relative z-10 container mx-auto hidden max-w-7xl px-6 py-20 text-center md:block'>
          <Bio className='sm:px-20' />
        </header>

        <main className="relative z-10 container mx-auto space-y-24 px-6 pb-12 lg:px-8">
          <section className="space-y-12" id="products">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
                <h2 className={`
                  bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold
                `}>
                  Products
                </h2>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
              </div>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Explore my latest projects and innovations
              </p>
            </div>

            <div className="space-y-12">
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
                  <Card key={slug} className={cn(
                    'group mx-auto max-w-6xl overflow-hidden',
                    'border-2 border-border/80 bg-card/80 backdrop-blur-sm',
                    'rounded-2xl shadow-lg hover:shadow-2xl',
                    'transition-all duration-500 ease-out',
                    'hover:scale-[1.02] hover:border-border hover:bg-card/95',
                    'grid grid-cols-1 gap-0 lg:grid-cols-[2fr_3fr]'
                  )}>
                    <CardContent className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          {link && (
                            <Link
                              className="group/title link-ripple inline-block rounded-lg px-2 py-1"
                              href={link ?? '#'}
                              target="_blank"
                            >
                              <CardTitle className={`
                                relative z-10 text-3xl font-bold transition-colors duration-300
                                group-hover/title:text-primary
                                lg:text-4xl
                              `}>
                                {title}
                              </CardTitle>
                            </Link>
                          )}
                          {version && (
                            <Badge className={`
                              rounded-xl border-primary/30 bg-primary/15 px-3 py-1 font-medium
                              text-primary
                            `}>
                              {version}
                            </Badge>
                          )}
                        </div>

                        <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                          {description}
                        </CardDescription>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tags?.map(tag => (
                          <Badge
                            key={tag}
                            className={`
                              rounded-lg bg-secondary/50 px-3 py-1 text-secondary-foreground
                              transition-colors
                              hover:bg-secondary/80
                            `}
                            variant="secondary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-4">
                        {repositoryLink && (
                          <Button
                            asChild
                            className={`
                              link-ripple-bg rounded-xl border-2 border-border/80
                              hover:border-primary/60 hover:bg-primary/10
                            `}
                            size="sm"
                            variant="outline"
                          >
                            <Link className="relative z-10 flex items-center gap-2"
                              href={repositoryLink}
                              target="_blank"
                            >
                              <FaGithub className="size-4" />
                              View Code
                            </Link>
                          </Button>
                        )}
                        {link && (
                          <Button
                            asChild
                            className={`
                              link-ripple rounded-xl bg-primary shadow-md
                              hover:bg-primary/90
                            `}
                            size="sm"
                          >
                            <Link className="relative z-10" href={link} target="_blank">
                              View Project
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>

                    <div className="overflow-hidden p-0 lg:rounded-l-2xl">
                      {coverImage?.url && (
                        <div className="relative lg:h-full">
                          <Image
                            alt={title ?? ''}
                            className={`
                              h-full w-full object-cover transition-transform duration-700
                              group-hover:scale-105
                            `}
                            height={400}
                            src={coverImage?.url}
                            width={400}
                          />
                        </div>
                      )}
                      {coverVideo?.url && (
                        <div className="relative lg:h-full">
                          <video
                            autoPlay
                            loop
                            muted
                            className={`
                              h-full w-full object-cover object-top transition-transform
                              duration-700
                              group-hover:scale-105
                            `}
                            src={coverVideo?.url}
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>

            {regularProducts && regularProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {regularProducts.map((product) => {
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
                    <Card
                      key={slug}
                      className={cn(
                        'group h-full overflow-hidden',
                        'border-2 border-border/70 bg-card/85 backdrop-blur-sm',
                        'rounded-2xl shadow-md hover:shadow-xl',
                        'transition-all duration-500 ease-out',
                        'gap-0 py-0 hover:scale-[1.03] hover:border-border hover:bg-card/95'
                      )}
                    >
                      <CardHeader className="relative overflow-hidden p-0">
                        <Link className="link-ripple-shift block" href={link ?? '#'} target="_blank">
                          {coverImage?.url && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                alt={title ?? ''}
                                className={`
                                  h-full w-full object-cover transition-transform duration-700
                                  group-hover:scale-110
                                `}
                                height={300}
                                src={coverImage?.url}
                                width={400}
                              />
                              <div className={`
                                absolute inset-0 bg-gradient-to-t from-black/50 via-transparent
                                to-transparent opacity-0 transition-opacity duration-500
                                group-hover:opacity-100
                              `} />
                            </div>
                          )}
                        </Link>
                      </CardHeader>

                      <CardContent className="flex flex-col gap-4 p-6">
                        <div className="flex items-center justify-between gap-4">
                          <Link className="group/title link-ripple flex-1 rounded-lg px-2 py-1" href={link ?? '#'} target="_blank">
                            <CardTitle className={`
                              relative z-10 line-clamp-2 font-semibold transition-colors
                              duration-300
                              group-hover/title:text-primary
                            `}>
                              <span className='text-xl'>{title}</span>
                            </CardTitle>
                          </Link>
                          {repositoryLink && (
                            <Button
                              asChild
                              className={`
                                link-ripple-bg shrink-0 rounded-xl border border-border/50
                                hover:bg-secondary/80
                              `}
                              size="icon"
                              variant="ghost"
                            >
                              <Link className="relative z-10" href={repositoryLink} target="_blank">
                                <FaGithub className="size-4" />
                                <span className="sr-only">View repository</span>
                              </Link>
                            </Button>
                          )}
                        </div>

                        <CardDescription className={`
                          line-clamp-3 leading-relaxed text-muted-foreground
                        `}>
                          {description}
                        </CardDescription>

                        <div className="mt-auto flex flex-wrap gap-2 pt-2">
                          {tags?.map(tag => (
                            <Badge
                              key={tag}
                              className={`
                                rounded-lg bg-secondary/50 px-3 py-1 text-secondary-foreground
                                transition-colors
                                hover:bg-secondary/80
                              `}
                              variant="secondary"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </section>

          <section className="space-y-12" id="til">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
                <h2 className={`
                  bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold
                `}>
                  Today I Learned
                </h2>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
              </div>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Insights and discoveries from my development journey
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts?.map((post) => (
                <Card
                  key={post.slug}
                  className={cn(
                    'group h-full',
                    'border-2 border-border/70 bg-card/85 backdrop-blur-sm',
                    'rounded-2xl shadow-md hover:shadow-xl',
                    'transition-all duration-500 ease-out',
                    'hover:scale-[1.02] hover:border-border hover:bg-card/95'
                  )}
                >
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        className="group/title link-ripple flex-1 rounded-lg px-2 py-1"
                        href={`/blog/${post.slug}`}
                      >
                        <CardTitle className={`
                          relative z-10 line-clamp-3 text-lg leading-tight font-semibold
                          transition-colors duration-300
                          group-hover/title:text-primary
                        `}>
                          {post.title}
                        </CardTitle>
                      </Link>
                      {post.featured && (
                        <FaStar className="mt-1 size-4 shrink-0 text-yellow-500" />
                      )}
                    </div>

                    <div className="flex-1" />

                    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {post.publishedDate && (
                            <span className="flex items-center gap-1.5">
                              <FaCalendarDay size={12} />
                              {formatDate(post.publishedDate)}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <FaRegClock size={12} />
                            {calcReadTime(post.content ?? '').text}
                          </span>
                        </div>
                        {post.author?.name && (
                          <span className="text-xs font-medium">{post.author.name}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer className={`
        container mx-auto border-t-2 border-border/60 bg-background/90 backdrop-blur-xl
      `} />
    </>
  )
}
