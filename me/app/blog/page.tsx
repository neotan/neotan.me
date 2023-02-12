'use client'
import Link from 'next/link'
import Image from 'next/image'
import { values } from 'ramda'
import mdxData from '../../public/db.json'
import { FlexImage } from '@/components/flex-image'
import { MdxDoc } from '@/types'
import MenuTabs from '@/components/menu-tabs'
import Bio from '@/components/bio'
import Navbar from '@/components/navbar'
import { MIN_CLOUDINARY_ACCOUNT_LENGTH } from '@/shared/constants'

type Slug = keyof typeof mdxData;

export default function BlogIndex() {

  return (
    <>
      <Navbar className='px-0 sm:px-10' >
        <div className='relative'>
          <Image
            className='h-16 w-16 rounded-full shadow-3xl transition-transform hover:scale-150'
            alt='Avatar'
            src='/images/avatar.jpg'
            width={200}
            height={200}
          />
        </div>
      </Navbar>
      <Bio className='text-center' />
      <MenuTabs />
      <section key='tldr' className='grid grid-cols-1 gap-6 px-4 sm:p-8 md:grid-cols-2'
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
                <div className='card glassmorphism !bg-secondary/30 h-full shadow-lg shadow-black/40 transition-transform hover:scale-105 '>
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
      </section>
    </>
  )
}

