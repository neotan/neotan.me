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
import { getAllPosts, getAllProducts } from '@/lib/remote-api'
import { cn, formatDate } from '@/lib/utils'

export default async function Home() {
  const products = await getAllProducts()
  const posts = await getAllPosts()
  const regularProducts = products?.filter(product => !product.featured)
  const featuredProducts = products?.filter(product => product.featured)

  return (
    <div className="min-h-screen bg-[#070707]">
      {/* Navbar */}
      <Navbar className="sticky top-0 z-50" />

      {/* Hero Section with Bio */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className={cn(
            'absolute top-0 left-1/4 size-[600px] -translate-x-1/2',
            'rounded-full bg-primary/[0.03] blur-3xl'
          )} />
          <div className={cn(
            'absolute right-1/4 bottom-0 size-[400px] translate-x-1/2',
            'rounded-full bg-accent/[0.03] blur-3xl'
          )} />
          <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        </div>

        <header className="relative z-10 container mx-auto max-w-6xl px-6 py-20 md:block">
          <Bio />
        </header>
      </div>

      {/* Divider */}
      <div className="mb-32 h-px divider-gradient" />
      {/* Main Content */}
      <main className="relative z-10 container mx-auto max-w-6xl space-y-32 px-6 pb-20">

        {/* Products Section */}
        <section className="space-y-12" id="products">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.1em] text-primary uppercase">
                / PRODUCTS
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Featured Work
              </h2>
            </div>
            <p className="max-w-xl text-lg font-light text-muted-foreground">
              Explore my latest projects and innovations
            </p>
          </div>

          {/* Featured Products - Large Cards */}
          <div className="space-y-8">
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
            }) => (
              <article
                key={slug}
                className={cn(
                  'group relative overflow-hidden',
                  'rounded-xs border-[0.5px] border-[#323232]',
                  'card-gradient',
                  'transition-all duration-500 ease-out',
                  'hover:border-[#3F3F46]',
                  'grid grid-cols-1 lg:grid-cols-[2fr_3fr]'
                )}
              >
                {/* Content */}
                <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                  <div className="space-y-4">
                    {/* Title with version badge */}
                    <div className="flex flex-wrap items-center gap-3">
                      {link ? (
                        <Link
                          className="group/title"
                          href={link}
                          target="_blank"
                        >
                          <h3 className={cn(
                            'text-2xl font-bold tracking-tight text-foreground',
                            'transition-colors duration-300 lg:text-3xl',
                            'group-hover/title:text-primary'
                          )}>
                            {title}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className={`
                          text-2xl font-bold tracking-tight text-foreground
                          lg:text-3xl
                        `}>
                          {title}
                        </h3>
                      )}
                      {version && (
                        <Badge className={cn(
                          'rounded-full border-[0.5px] border-[#323232] bg-[#151515]',
                          'px-3 py-1 text-xs font-medium text-foreground/70',
                          'transition-colors duration-200',
                          'hover:bg-[#1A1A1E] hover:text-foreground'
                        )}>
                          {version}
                        </Badge>
                      )}
                    </div>

                    {/* Description - light weight */}
                    <p className="text-base leading-relaxed font-light text-muted-foreground">
                      {description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags?.map(tag => (
                      <Badge
                        key={tag}
                        className={cn(
                          'rounded-full border-[0.5px] border-[#323232] bg-[#151515]',
                          'px-3 py-1 text-xs font-medium text-foreground/70',
                          'transition-colors duration-200',
                          'hover:bg-[#1A1A1E] hover:text-foreground'
                        )}
                        variant="secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    {repositoryLink && (
                      <Button
                        asChild
                        className={cn(
                          'rounded-xl border-[0.5px] border-[#323232] bg-transparent',
                          'text-muted-foreground',
                          'transition-all duration-200',
                          'hover:border-[#3F3F46] hover:bg-[#151515] hover:text-foreground'
                        )}
                        size="sm"
                        variant="outline"
                      >
                        <Link className="flex items-center gap-2" href={repositoryLink} target="_blank">
                          <FaGithub className="size-4" />
                          <span>View Code</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Media */}
                <div className="relative overflow-hidden">
                  {coverImage?.url && (
                    <div className="relative h-64 lg:h-full">
                      <Image
                        alt={title ?? ''}
                        className={cn(
                          'h-full w-full object-cover',
                          'transition-transform duration-700',
                          'group-hover:scale-105'
                        )}
                        height={400}
                        src={coverImage?.url}
                        width={600}
                      />
                      {/* Gradient overlay */}
                      <div className={cn(
                        'pointer-events-none absolute inset-0 bg-gradient-to-r',
                        'from-[#070707] via-transparent to-transparent lg:from-[#151515]'
                      )} />
                    </div>
                  )}
                  {coverVideo?.url && (
                    <div className="relative h-64 lg:h-full">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={cn(
                          'h-full w-full object-cover object-top',
                          'transition-transform duration-700',
                          'group-hover:scale-105'
                        )}
                        src={coverVideo?.url}
                      />
                      <div className={cn(
                        'pointer-events-none absolute inset-0 bg-gradient-to-r',
                        'from-[#070707] via-transparent to-transparent lg:from-[#151515]'
                      )} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Regular Products - Grid */}
          {regularProducts && regularProducts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                  <article
                    key={slug}
                    className={cn(
                      'group relative flex h-full flex-col overflow-hidden',
                      'rounded-xs border-[0.5px] border-[#323232]',
                      'card-gradient',
                      'transition-all duration-300 ease-out',
                      'hover:-translate-y-1 hover:border-[#3F3F46]'
                    )}
                  >
                    {/* Image */}
                    {coverImage?.url && (
                      <Link className="block overflow-hidden" href={link ?? '#'} target="_blank">
                        <div className="relative h-60 overflow-hidden">
                          <Image
                            alt={title ?? ''}
                            className={cn(
                              'h-full w-full object-cover',
                              'transition-transform duration-700',
                              'group-hover:scale-110'
                            )}
                            height={300}
                            src={coverImage?.url}
                            width={400}
                          />
                          <div className={cn(
                            'pointer-events-none absolute inset-0 bg-gradient-to-t',
                            'from-[#070707] to-transparent opacity-60'
                          )} />
                        </div>
                      </Link>
                    )}

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <Link className="group/title flex-1" href={link ?? '#'} target="_blank">
                          <h3 className={cn(
                            'line-clamp-2 text-lg font-semibold text-foreground',
                            'transition-colors duration-200',
                            'group-hover/title:text-primary'
                          )}>
                            {title}
                          </h3>
                        </Link>
                        {repositoryLink && (
                          <Link
                            className={cn(
                              'shrink-0 rounded-lg p-2',
                              'text-muted-foreground',
                              'transition-colors duration-200',
                              'hover:bg-[#1A1A1E] hover:text-foreground'
                            )}
                            href={repositoryLink}
                            target="_blank"
                          >
                            <FaGithub className="size-4" />
                            <span className="sr-only">View repository</span>
                          </Link>
                        )}
                      </div>

                      <p className={cn(
                        'line-clamp-3 text-sm leading-relaxed font-light',
                        'text-muted-foreground'
                      )}>
                        {description}
                      </p>

                      {/* Tags */}
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {tags?.slice(0, 3).map(tag => (
                          <Badge
                            key={tag}
                            className={cn(
                              'rounded-full border-[0.5px] border-[#323232] bg-transparent',
                              'px-2.5 py-0.5 text-xs font-medium text-muted-foreground'
                            )}
                            variant="secondary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="h-px divider-gradient" />

        {/* TIL Section */}
        <section className="space-y-12" id="til">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium tracking-[0.1em] text-accent uppercase">
                / TIL
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Today I Learned
              </h2>
            </div>
            <p className="max-w-xl text-lg font-light text-muted-foreground">
              Insights and discoveries from my development journey
            </p>
          </div>

          {/* Posts Grid */}
          <div className={cn(
            'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
            'overflow-hidden border border-[#232323]'
          )}>
            {posts?.map((post) => (
              <article
                key={post.slug}
                className={cn(
                  'group relative flex h-full flex-col',
                  'card-gradient',
                  'border-[#232323]',
                  // Right border for all except last in each row
                  'border-r',
                  'md:[&:nth-child(2n)]:border-r-0',
                  'xl:[&:nth-child(2n)]:border-r',
                  'xl:[&:nth-child(3n)]:border-r-0',
                  // Bottom border for all except last row
                  'border-b',
                  'last:border-b-0',
                  'md:[&:nth-last-child(-n+2)]:border-b-0',
                  'xl:[&:nth-last-child(-n+2)]:border-b',
                  'xl:[&:nth-last-child(-n+3)]:border-b-0',
                  // Hover effect
                  'transition-all duration-300 ease-out',
                  'hover:bg-[#151515]'
                )}
              >
                <div className="flex h-full flex-col gap-4 p-6">
                  {/* Title */}
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      className="group/title flex-1"
                      href={`/blog/${post.slug}`}
                    >
                      <h3 className={cn(
                        'line-clamp-3 text-lg leading-snug font-semibold text-foreground',
                        'transition-colors duration-200',
                        'group-hover/title:text-primary'
                      )}>
                        {post.title}
                      </h3>
                    </Link>
                    {post.featured && (
                      <FaStar className="mt-1 size-4 shrink-0 text-yellow-500" />
                    )}
                  </div>

                  <div className="flex-1" />

                  {/* Meta */}
                  <div className={cn(
                    'flex items-center justify-between gap-4',
                    'text-xs text-muted-foreground'
                  )}>
                    <div className="flex items-center gap-3">
                      {post.publishedDate && (
                        <span className="flex items-center gap-1.5">
                          <FaCalendarDay className="size-3" />
                          {formatDate(post.publishedDate)}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <FaRegClock className="size-3" />
                        {calcReadTime(post.content ?? '').text}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
