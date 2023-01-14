"use client"
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import { Card } from 'react-daisyui'
import { map, values } from 'ramda'
import { JetBrains_Mono, Mitr } from "@next/font/google";
import mdxData from '../public/db.json'
import Navbar from '@/components/navbar'
import { FlexImage } from '@/components/flex-image'
import { MdxDoc } from '@/types'
import Footer from '@/components/footer'

const mitr = Mitr({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700"]
})
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "100", "800"]
})

type Slug = keyof typeof mdxData

export default function HomeIndex() {
  return (
    <>
      <style jsx global>
        {`:root{
              --mitr-font: ${mitr.style.fontFamily};
              --jbmono-font: ${jetBrainsMono.style.fontFamily};
            }`}
      </style>
      <ThemeProvider
        attribute="data-theme"
        storageKey={`neotan.me-root-theme"`}
        defaultTheme='lofi'
      >
        <div className='px-4 sm:px-6 md:px-8'>
          <Navbar className='sticky top-0 z-40  border-b border-base-100/10 backdrop-blur' />
          <main className="mx-auto max-w-7xl grow">
            <h2 id='showcases' className='text-5xl'>SHOWCASES</h2>
            <section key='showcase' className='grid grid-cols-3 gap-4' >
              {values(products).map(({
                id,
                title,
                description,
                homepage,
                imageUrl,
                tags,
                published
              }: Product) => {
                return (
                  <Link key={id} href={homepage}>
                    <Card className='h-full'>
                      <Card.Image src={imageUrl} alt={`Image of ${title}`} />
                      {/* <FlexImage /> */}
                      <Card.Actions >
                        <h2 className="">{title}</h2>
                        <div className="">{description}</div>
                        {!published && <div className="">Coming soon...</div>}
                      </Card.Actions>
                    </Card>
                  </Link>
                )
              })}
            </section>
            <h2 id='tldr' className='text-5xl'>TL;DR:</h2>
            <section key='tldr' className='grid grid-cols-3 gap-4' >
              {values(mdxData as Record<Slug, MdxDoc>)
                .map((doc) => {
                  console.log(doc.slug)
                  const { slug,
                    frontmatter: { title, cloudinaryImgPubId, description, published }
                  } = doc
                  return (
                    <Link key={slug} href={`/blog/${slug}`}>
                      <Card className='h-full'>
                        <FlexImage
                          className='h-60 rounded-b-none object-cover'
                          cloudinaryImgPubId={cloudinaryImgPubId} />
                        <Card.Actions >
                          <h2 className="">{title}</h2>
                          <div className="">{description}</div>
                          {!published && <div className="">Coming soon...</div>}
                        </Card.Actions>
                      </Card>
                    </Link>
                  )
                })}
            </section>
          </main>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  )
}

interface Product {
  id: string
  title: string
  description: string
  homepage: string
  imageUrl: string
  tags: string[]
  published: boolean
}

const products: Record<string, Product> = {
  npmhub: {
    id: 'npmhub',
    title: 'NPMHUB.NET',
    description: `Search and Compare NPM packages for the best-fits for your projects`,
    homepage: 'npmhub.net',
    imageUrl: 'https://res.cloudinary.com/ntme/image/upload/f_auto/c_scale,w_1000/v1661226653/blog/translate-image_dplyag.png?_a=ATRSRAA0',
    tags: ['web'],
    published: true,
  },
  hash: {
    id: 'hash',
    title: 'Hash',
    description: 'Generate text/file (up to 10GB) hash with WASM',
    homepage: 'hash.npmhub.net',
    imageUrl: 'https://res.cloudinary.com/ntme/image/upload/f_auto/c_scale,w_1000/v1661226653/blog/translate-image_dplyag.png?_a=ATRSRAA0',
    tags: ['web'],
    published: true,
  },
  web3: {
    id: 'web3',
    title: 'web3',
    description: 'Landing page for a web3 website',
    homepage: 'npmhub.net/show/web3',
    imageUrl: 'https://res.cloudinary.com/ntme/image/upload/f_auto/c_scale,w_1000/v1661226653/blog/translate-image_dplyag.png?_a=ATRSRAA0',
    tags: ['web', 'animation'],
    published: false,
  },
}
