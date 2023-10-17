'use client'
import '@reach/dialog/styles.css'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRouter } from 'next/router'
import { values } from 'ramda'
import { ComponentPropsWithoutRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useKey } from 'react-use'
import { deserialize } from 'superjson'
import { cn } from 'utils/helpers'
import { useFuse } from 'utils/hooks'
import data from '../public/db.json'
import { BlogSearchIndex, PostFile } from '../types'

type SearchButtonProps = ComponentPropsWithoutRef<'svg'>

export default function SearchButton({ className }: SearchButtonProps) {
  const router = useRouter()

  const fuseOptions = {
    keys: ['title', 'tags', 'content'],
    includeScore: true,
  }
  const [visible, setVisible] = useState(false)
  const toggleModal = () => setVisible(prev => !prev)
  useKey('/', toggleModal)

  const [searchTerm, setSearchTerm] = useState('')

  //@ts-ignore
  const searchIndices: BlogSearchIndex[] = values(deserialize<Record<string, PostFile>>(data))
    .map(({ meta, content }) => ({ ...meta, content }))
    .filter(({ published }) => Boolean(published))

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
        isOpen={visible}
        onDismiss={toggleModal}
        style={{ alignSelf: 'start' }}
      >
        <DialogContent className="modal-box !w-[100vw] !bg-base-100">
          <input
            className="border-1 input w-full border-base-300"
            autoFocus
            type="search"
            placeholder="Search, press [ Esc] to clear"
            onChange={e => {
              setSearchTerm(e?.target?.value)
            }}
          />
          <label className="label border-b-[1px]">
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
          <ol className="divide-y-[1px] divide-dashed divide-base-300 overflow-y-auto">
            {result?.map(({ item }) => {
              const {
                slug,
                title,
              } = item

              return (
                <li
                  key={slug}
                  className="flex cursor-pointer justify-between space-x-4 p-3 transition hover:bg-base-300"
                  onClick={() => router.push(`/blog/${slug}`)}
                >
                  <div className="flex w-full flex-col">{title}</div>
                </li>
              )
            })}
          </ol>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}