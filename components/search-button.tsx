import { createRef, useState } from 'react'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { Input, Kbd, Modal } from 'react-daisyui'
import { map, pipe, values } from 'ramda'
import { useKey } from 'react-use'
import { BaseProps, BlogSearchIndex, MdxPage } from '~/types'
import { useFuse } from '~/utils/hooks'
import { formatDate } from '~/utils/helpers'
import mdxData from 'public/db.json'
import { FlexImage } from './flex-image'

export const searchIndices = pipe(values, map(mdxToIndex))(mdxData)
const fuseOptions = {
  keys: ['title', 'content', 'tags'],
  includeScore: true,
  threshold: 0.6,
}

export default function SearchButton({ className }: BaseProps<'svg'>) {
  const toggleModal = () => setVisable(prev => !prev)
  useKey('/', toggleModal)
  const [visable, setVisable] = useState(false)

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
      <Modal
        id="modal-search"
        className="mt-10 overflow-y-hidden bg-secondary"
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
              <Link key={item.slug} href={item.url}>
                <a className="flex justify-between space-x-4 p-3 transition hover:bg-secondary">
                  <FlexImage
                    className="hidden w-20 md:inline-block"
                    cloudinaryImgPubId={item.cloudinaryImgPubId}
                  />
                  <div className="flex w-full flex-col">{item.title}</div>
                </a>
              </Link>
            )
          })}
        </Modal.Body>
      </Modal>
    </>
  )
}

export function mdxToIndex({
  slug,
  content,
  frontmatter,
}: Pick<MdxPage, 'slug' | 'content' | 'frontmatter'>): BlogSearchIndex {
  const { title, date, catalog, cloudinaryImgPubId, tags, description } =
    frontmatter

  return {
    slug,
    title,
    content,
    url: `/blog/${slug}`,
    cloudinaryImgPubId,
    tags,
    description,
    date: formatDate(date, 'yyyy-MM-dd'),
  }
}
