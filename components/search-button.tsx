import { useState } from 'react'
import Link from 'next/link'
import algoliasearch from 'algoliasearch/lite'
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
  Snippet,
} from 'react-instantsearch-hooks-web'
import { FiSearch } from 'react-icons/fi'
import { SearchClient } from 'instantsearch.js/es/types'
import { twMerge } from 'tailwind-merge'
import { Modal } from 'react-daisyui'
import AlgoliaIcon from '~/icons/algolia-icon'
import { BaseProps } from '~/types/index'
import { FlexImage } from './flex-image'

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY)
const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      // To prevent the search when the query is "".
      // https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/js/#detecting-empty-search-requests
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      })
    }

    return algoliaClient.search(requests)
  },
}

function CustomHit({ hit }) {
  return (
    <Link href={hit.url}>
      <a>
        <article className="flex justify-between space-x-2 p-3 transition hover:bg-secondary sm:px-6 ">
          <FlexImage
            className="hidden w-20 md:inline-block"
            cloudinaryImgPubId={hit.cloudinaryImgPubId}
          />
          <div className="flex w-full flex-col">
            <Highlight
              attribute="title"
              hit={hit}
              classNames={{
                root: 'flex-1 break-all px-2 font-heading text-lg font-semibold md:text-xl block',
              }}
            />
            <Snippet
              attribute="content"
              hit={hit}
              classNames={{
                root: 'p-2',
              }}
            />
          </div>
        </article>
      </a>
    </Link>
  )
}

const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

export default function SearchButton({ className }: BaseProps<'svg'>) {
  const toggleModal = () => setVisable(prev => !prev)
  const [visable, setVisable] = useState(false)

  // TODO: auto focus on search input '.ais-SearchBox-input'

  return (
    <>
      <FiSearch
        className={twMerge('cursor-pointer', className)}
        onClick={toggleModal}
      />
      <Modal
        id="modal-search"
        className="max-h-[80vh] w-[90vw] border-primary bg-primary shadow-primary sm:w-[50vw]"
        // backdropClass="items-start pt-10 bg-opacity-60 "
        open={visable}
        onClickBackdrop={toggleModal}
      >
        <Modal.Body>
          <InstantSearch
            searchClient={searchClient as SearchClient}
            indexName={ALGOLIA_INDEX_NAME}
          >
            <SearchBox
              className="flex items-center space-x-3 rounded-t-xl bg-secondary p-4 "
              placeholder="Type to search, [Esc] to clear, [Alt]+[Q] to close/open"
              classNames={{
                reset: 'hidden',
                submit: 'hidden',
                form: 'w-full',
                input:
                  'rounded-2xl h-12 w-full bg-tertiary px-4 py-2 text-2xl font-heading placeholder-gray-300 text-primary',
              }}
            />
            <Hits
              hitComponent={CustomHit}
              onClick={toggleModal}
              classNames={{
                root: 'overflow-y-auto overflow-x-hidden max-h-[calc(70vh_-_3rem)] brightness-125',
                list: 'divide-y divide-primary divide-dashed',
              }}
            />
          </InstantSearch>
        </Modal.Body>
        <Modal.Actions className="space-x-2 rounded-b-xl bg-secondary">
          <div className=" opacity-60">Powered by</div>
          <AlgoliaIcon className=" opacity-60" />
        </Modal.Actions>
      </Modal>
    </>
  )
}
