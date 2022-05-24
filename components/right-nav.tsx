import {useState} from 'react'
import {useTheme} from 'next-themes'
import Link from 'next/link'
import algoliasearch from 'algoliasearch/lite'
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch-hooks-web'
import {MoonIcon, SearchIcon, SunIcon} from '@heroicons/react/outline'
import {AnimatePresence, motion as mo} from 'framer-motion'
import AlgoliaIcon from '~/icons/algolia-icon'
import {FlexImage} from './image'
import Modal from './modal'

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY)
const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({params}) => !params.query)) {
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

function CustomHit({hit}) {
  return (
    <Link href={`blogs/${hit.objectID}`}>
      <a>
        <article className="hover:bg-secondary flex justify-between space-x-2 py-3 px-6 transition ">
          <FlexImage
            className="hidden w-20 md:inline-block"
            cloudinaryImgPubId={hit.cloudinaryImgPubId}
          />
          <h1 className="flex-1 break-all px-2 text-xl md:text-2xl">
            {hit.title}
          </h1>
          <Highlight attribute={['title', 'content']} hit={hit} />
        </article>
      </a>
    </Link>
  )
}

const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

function SearchButton() {
  const toggleModal = () => setVisable(prev => !prev)
  const [visable, setVisable] = useState(false)

  // TODO: auto focus on search input '.ais-SearchBox-input'

  return (
    <>
      <SearchIcon className="h-8 cursor-pointer" onClick={toggleModal} />
      <Modal
        id="modal-search"
        className="bg-primary shadow-primary border-primary max-h-[80vh] w-[60rem] max-w-[60rem]"
        backdropClass="items-start pt-10 bg-opacity-60 "
        open={visable}
        onClickBackdrop={toggleModal}
      >
        <Modal.Body>
          <InstantSearch
            searchClient={searchClient}
            indexName={ALGOLIA_INDEX_NAME}
          >
            <SearchBox
              className="bg-secondary flex items-center space-x-3 rounded-t-xl p-4 "
              placeholder="Type to search, [Esc] to clear, [Alt]+[Q] to close/open"
              classNames={{
                reset: 'hidden',
                submit: 'hidden',
                form: 'w-full',
                input:
                  'rounded-2xl h-12 w-full bg-tertiary px-4 py-2 text-2xl font-heading placeholder-gray-300 dark:placeholder-gray-500',
              }}
            />
            <Hits
              hitComponent={CustomHit}
              classNames={{
                root: 'overflow-y-auto overflow-x-hidden max-h-[calc(70vh_-_3rem)] brightness-125',
                list: 'divide-y divide-primary divide-dashed',
              }}
            />
          </InstantSearch>
        </Modal.Body>
        <Modal.Footer className="bg-secondary space-x-2 rounded-b-xl">
          <div>Search by</div>
          <AlgoliaIcon />
        </Modal.Footer>
      </Modal>
    </>
  )
}

function DarkModeToggle() {
  function toggle() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const {theme, setTheme} = useTheme()
  const Icon = theme === 'light' ? SunIcon : MoonIcon

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <mo.button
        className="text-2xl"
        key={theme}
        onClick={toggle}
        initial={{y: -20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        exit={{y: 20, opacity: 0}}
        transition={{duration: 0.2}}
      >
        <Icon className="h-8 cursor-pointer" />
      </mo.button>
    </AnimatePresence>
  )
}

export default function RightNav() {
  return (
    <div className="flex max-w-[8rem] flex-grow justify-evenly">
      <SearchButton />
      <DarkModeToggle />
    </div>
  )
}
