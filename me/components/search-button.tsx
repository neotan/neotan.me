'use client'
import '@reach/dialog/styles.css'
import { ComponentPropsWithoutRef, useState } from 'react'
import Link from 'next/link'
import { BiSearch } from 'react-icons/bi'
import { cn } from 'utils/helpers'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { map, pipe, values } from 'ramda'
import { useKey } from 'react-use'
import { useFuse } from 'utils/hooks'
import { formatDate } from 'utils/helpers'
import mdxData from 'public/db.json'
import type { BlogSearchIndex, MdxDoc } from '@/types'
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
        isOpen={visable}
        onDismiss={toggleModal}
        style={{ alignSelf: 'start' }}
      >
        <DialogContent className="modal-box">
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
          <ol className="divide-base-200 divide-dashed overflow-y-auto">
            {result?.map(({ item }) => {
              return (
                <Link key={item.slug} href={item.url || ''} className="flex justify-between space-x-4 p-3 transition hover:bg-gray-200">
                  <FlexImage
                    className="hidden w-20 md:inline-block"
                    cloudinaryImgPubId={item.cloudinaryImgPubId}
                  />
                  <div className="flex w-full flex-col">{item.title}</div>
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
