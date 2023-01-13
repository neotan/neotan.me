"use client"
import { useState } from 'react'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { Input, Kbd, Modal } from 'react-daisyui'
import { map, pipe, values } from 'ramda'
import { useKey } from 'react-use'
import { useFuse } from 'utils/hooks'
import { formatDate } from 'utils/helpers'
import type { BaseProps } from 'shared-types'
import mdxData from 'public/db.json'
import { FlexImage } from './flex-image'
import type { BlogSearchIndex, MdxDoc } from '@/types'
import Portal from '@/components/portal'

const searchIndices = pipe(values, map(mdxToFuseIndex))(mdxData)
const fuseOptions = {
  keys: ['title', 'content', 'tags'],
  includeScore: true,
  threshold: 0.6,
}

export default function SearchButton({ className }: BaseProps<'svg'>) {
  const [visable, setVisable] = useState(false)
  const toggleModal = () => setVisable(prev => !prev)
  useKey('/', toggleModal)

  const [searchTerm, setSeachTerm] = useState('')
  const result = useFuse<BlogSearchIndex>(
    searchIndices,
    searchTerm,
    fuseOptions,
  )

  return (
    <>
      <FiSearch
        title="Press [ / ] to open/close"
        className={twMerge('cursor-pointer', className)}
        onClick={toggleModal}
      />
      <Portal htmlTag='search-modal-root'>
        <Modal
          className="mt-10 overflow-y-hidden"
          open={visable}
          onClickBackdrop={toggleModal}
          style={{ alignSelf: 'start' }}
        >
          <Modal.Header className="mb-0">
            <Input
              className="w-full"
              bordered
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
                <Kbd className="mx-1 rounded-sm" size="xs">
                  Esc
                </Kbd>{' '}
                to clear,
                <Kbd className="mx-1 rounded-sm" size="xs">
                  /
                </Kbd>{' '}
                to open/close
              </span>
            </label>
          </Modal.Header>
          <Modal.Body className="divide-y-2 divide-dashed divide-base-200">
            {result?.map(({ item }) => {
              return (
                <Link key={item.slug} href={item.url || ''} className="flex justify-between space-x-4 p-3 transition hover:bg-base-200">
                  <FlexImage
                    className="hidden w-20 md:inline-block"
                    cloudinaryImgPubId={item.cloudinaryImgPubId}
                  />
                  <div className="flex w-full flex-col">{item.title}</div>
                </Link>
              )
            })}
          </Modal.Body>
        </Modal>
      </Portal>
    </>
  )
}

function mdxToFuseIndex({
  slug,
  content,
  frontmatter,
}: Pick<MdxDoc, 'slug' | 'content' | 'frontmatter'>): BlogSearchIndex {
  const { title, date, catalog, cloudinaryImgPubId, tags, description } =
    frontmatter

  return {
    slug,
    title,
    content,
    url: `/blog/${slug}`,
    cloudinaryImgPubId,
    tags,
    catalog,
    description,
    date: formatDate(date || '', 'yyyy-MM-dd'),
  }
}
