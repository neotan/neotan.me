'use client'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { values } from 'ramda'
import mdxData from '@/public/db.json'
import { FlexImage } from '@/components/flex-image'
import { MdxDoc } from '@/types'
import NavTabs from '@/components/nav-tabs'
import Bio from '@/components/bio'
import Navbar from '@/components/navbar'

type Slug = keyof typeof mdxData;

export default function HomeIndex() {

  return (
    <>
      <Navbar className='px-0 sm:px-10' >
        <Link href='/'>
          <Image
            className='rounded-full shadow-3xl'
            alt='Avatar'
            src='/images/avatar-icon.png'
            width={60}
            height={60}
          />
        </Link>
      </Navbar>
      <Bio />
      <NavTabs />
      <section key='tldr' className='grid grid-cols-1 gap-6 sm:grid-cols-2'
      >
        {values(mdxData as Record<Slug, MdxDoc>)
          .sort((right, left) =>
            String(left?.date ?? '').localeCompare(String(right?.date ?? '')))
          .map(({
            slug,
            title,
            cloudinaryImgPubId = '',
            description,
            published
          }) => {
            if (!published) return null

            return (
              <Link key={slug} href={`/blog/${slug}`}>
                <div className='card h-full shadow-2xl'>
                  <div className="card-body rounded-2xl p-4 sm:p-8">
                    <figure className='grow'>
                      {cloudinaryImgPubId.length > 10 // length of Cloudinary Account
                        ? <FlexImage
                          className='h-52 rounded-b-none object-cover'
                          cloudinaryImgPubId={cloudinaryImgPubId} />
                        : <div className='items-center justify-center text-7xl'>{cloudinaryImgPubId}</div>
                      }
                    </figure>
                    <div className='card-actions'>
                      <h2 className="">{title}</h2>
                      {/* <div className="">{description}</div> */}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
      </section>
    </>
  )
}

