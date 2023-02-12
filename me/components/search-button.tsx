'use client'
import '@reach/dialog/styles.css'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import Link from 'next/link'
import { map, pipe, values } from 'ramda'
import { ComponentPropsWithoutRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useKey } from 'react-use'
import { cn } from 'utils/helpers'
import { formatDate } from 'utils/helpers'
import { useFuse } from 'utils/hooks'
import { MIN_CLOUDINARY_ACCOUNT_LENGTH } from '@/shared/constants'
import type { BlogSearchIndex, MdxDoc } from '@/types'
import mdxData from 'public/db.json'
import { FlexImage } from './flex-image'


type SearchButtonProps = ComponentPropsWithoutRef<'svg'>

const searchIndices = pipe(
  values,
  map(mdxToFuseIndex),
)(mdxData)
const fuseOptions = {
  keys: ['title', 'content', 'tags'],
  includeScore: true,
  threshold: 0.6,
}

export default function SearchButton({ className }: SearchButtonProps) {
  const [visable, setVisable] = useState(false)
  const toggleModal = () => setVisable(prev => {
    return !prev
  })
  useKey('/', toggleModal)

  const [searchTerm, setSeachTerm] = useState('')
  const result = useFuse<BlogSearchIndex>(
    searchIndices,
    searchTerm,
    fuseOptions,
  )

  return (
    <>
      <BiSearch
        title="Press [ / ] to open/close"
        className={cn('cursor-pointer', className)}
        onClick={toggleModal}
      />
      <DialogOverlay
        className='backdrop-blur-sm backdrop-grayscale'
        isOpen={visable}
        onDismiss={toggleModal}
        style={{ alignSelf: 'start' }}
      >
        <DialogContent className="modal-box !w-[100vw] !bg-base-300">
          <input
            className="input w-full"
            autoFocus
            type="search"
            placeholder="Search, press [ Esc] to clear"
            onChange={e => {
              setSeachTerm(e?.target?.value)
            }}
          />
          <label className="label">
            <span className="label-text-alt">Found {result.length}</span>
            <span className="label-text-alt">
              Press{' '}
              <kbd className="kbd kbd-xs mx-1 rounded-sm">
                Esc
              </kbd>{' '}
              to clear,
              <kbd className="rounded-xs kbd kbd-xs mx-1">
                /
              </kbd>{' '}
              to open/close
            </span>
          </label>
          <ol className="divide-dashed divide-red-700 overflow-y-auto">
            {result?.map(({ item }) => {
              const {
                slug,
                url = '',
                cloudinaryImgPubId = '',
                title,
              } = item

              return (
                <Link key={slug} href={url} className="flex justify-between space-x-4 p-3 transition hover:bg-base-200">

                  {cloudinaryImgPubId.length > MIN_CLOUDINARY_ACCOUNT_LENGTH
                    ? <FlexImage
                      className="hidden w-20 md:inline-block"
                      cloudinaryImgPubId={cloudinaryImgPubId}
                    />
                    : <div className='flex w-24 items-center justify-center'>{cloudinaryImgPubId}</div>
                  }
                  <div className="flex w-full flex-col">{title}</div>
                </Link>
              )
            })}
          </ol>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

function mdxToFuseIndex({
  slug,
  content,
  title,
  date,
  catalog,
  cloudinaryImgPubId,
  tags,
  description,
  published,
}: Pick<MdxDoc, 'slug' | 'content' | 'title' | 'date' | 'catalog' | 'cloudinaryImgPubId' | 'tags' | 'description' | 'published'
>): BlogSearchIndex {

  return {
    slug,
    title,
    content,
    url: `/blog/${slug}`,
    cloudinaryImgPubId,
    tags,
    catalog,
    description,
    published,
    date: formatDate(date || '', 'yyyy-MM-dd'),
  }
}
