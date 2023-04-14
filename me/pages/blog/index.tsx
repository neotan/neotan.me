'use client'
import Image from 'next/image'
import Link from 'next/link'
import { values } from 'ramda'
import React from 'react'
import Bio from '../../components/bio'
import DefaultLayout from '../../components/default-layout'
import { FlexImage } from '../../components/flex-image'
import MenuTabs from '../../components/menu-tabs'
import Navbar from '../../components/navbar'
import mdxData from '../../public/db.json'
import { MIN_CLOUDINARY_ACCOUNT_LENGTH } from '../../shared/constants'
import { MdxDoc } from '../../types'

type Slug = keyof typeof mdxData;

export default function BlogIndex() {

  return (
    <DefaultLayout>
      <main key='til' className='grid grid-cols-1 gap-6 px-4 sm:p-8 md:grid-cols-2'
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
                <div className='glassmorphism card h-full !bg-secondary/30 shadow-lg shadow-black/40 transition-transform hover:scale-105 '>
                  <div className="card-body rounded-2xl p-0">
                    <figure className='grow'>
                      {cloudinaryImgPubId.length > MIN_CLOUDINARY_ACCOUNT_LENGTH
                        ? <FlexImage
                          className='h-52 rounded-2xl rounded-b-none object-cover'
                          cloudinaryImgPubId={cloudinaryImgPubId} />
                        : <div className='items-center justify-center p-8 text-5xl sm:p-4'>{cloudinaryImgPubId}</div>
                      }
                    </figure>
                    <div className='card-actions p-3 sm:p-8'>
                      <h2 className="">{title}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
      </main>
    </DefaultLayout>
  )
}

