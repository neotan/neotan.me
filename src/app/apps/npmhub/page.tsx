'use client'
import React, { type MouseEvent, useEffect, useState, type ComponentProps } from 'react'

import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { history } from 'instantsearch.js/es/lib/routers'
import { type RouterProps } from 'instantsearch.js/es/middlewares/createRouterMiddleware'
import Link from 'next/link'
import { includes, map, pipe, reject, toPairs, uniq, without } from 'ramda'
import { AiFillGitlab } from 'react-icons/ai'
import {
  FaBalanceScale,
  FaDownload,
  FaGithub,
  FaTag,
} from 'react-icons/fa'
import { ImNpm, ImTree } from 'react-icons/im'
import { IoLogoBitbucket } from 'react-icons/io'
import { type IconType } from 'react-icons/lib'
import { SiRunkit, SiTypescript } from 'react-icons/si'
import {
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
} from 'react-instantsearch'
import { useHash } from 'react-use'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  cn,
  formatDistanceShort,
  isBrowser,
  isNilOrEmpty,
  isNilOrEmptyOrFalsy,
  objToStr,
  strToObj,
} from '@/lib/utils'

import { Autocomplete } from './_components/autocomplete'
import PkgBasket from './_components/pkg-basket'
import AlgoliaIcon from './_icons/algolia-icon'
import CdnJsIcon from './_icons/cdnjs-icon'
import JsDelivrIcon from './_icons/jsdelivr-icon'
import OpenbaseIcon from './_icons/openbase-icon'
import UnpkgIcon from './_icons/unpkg-icon'
import { type AlgoliaHitProps } from './_types'

import type { UiState } from 'instantsearch.js/es/types'

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
)
const searchClient = {
  ...algoliaClient,
  //@ts-ignore
  search(requests) {
    if (
      requests.every(
        ({ params }: { params: { query?: string } }) => !params.query,
      )
    ) {
      return Promise.resolve({
        results: requests.map(() => ({
          //@ts-ignore
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

const repoIcons: Record<string, { Icon: IconType, title?: string }> = {
  'github.com': { Icon: FaGithub, title: 'Github' },
  'bitbucket.org': { Icon: IoLogoBitbucket, title: 'Bitbucket' },
  'gitlab.com': { Icon: AiFillGitlab, title: 'Gitlab' },
}

const routing = {
  router: history(),
  stateMapping: {
    stateToRoute(uiState: UiState) {
      const indexUiState = uiState[INDEX_NAME]
      return {
        q: indexUiState?.query,
        page: indexUiState?.page,
      }
    },
    routeToState(routeState: UiState) {
      return {
        [INDEX_NAME]: {
          query: routeState?.q,
          page: routeState?.page,
        },
      }
    },
  },
}

const externalUrlClasses = 'h-6 w-6 cursor-pointer fill-accent'

type HashConfig = {
  hl?: boolean,
  b?: string[],
}

export default function NpmHubApp() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const [hasQuery, setHasQuery] = useState(false)
  //eslint-disable-next-line
  const [hash, setHash] = isBrowser ? useHash() : ['', () => { }]
  const hashCfg = strToObj<HashConfig>(hash) || {}
  const selectedPkgNames: string[] = hashCfg?.b || []
  const enableHighlight = hashCfg?.hl

  function toggleHighlight(checked: boolean) {
    setHash(objToHash({ ...hashCfg, hl: checked }))
  }

  function setSelectedPkgNames(pkgNames: string[]) {
    setHash(objToHash({ ...hashCfg, b: pkgNames }))
  }

  return (
    <div suppressHydrationWarning className="mx-auto w-full flex-1 px-4">
      <main className="flex flex-col">
        <InstantSearch
          indexName={INDEX_NAME}
          routing={routing as unknown as RouterProps<UiState, UiState>}
          searchClient={searchClient as ReturnType<typeof algoliasearch>}
          onStateChange={({ uiState, setUiState }) => {
            setHasQuery(!!uiState?.[INDEX_NAME]?.query?.trim())
            setUiState(uiState)
          }}
        >
          <Autocomplete
            openOnFocus
            className="input-bordered rounded-md border-zinc-300"
            classNames={{
              form: '!rounded-md focus-within:!border-secondary !shadow-sm',
              inputWrapperPrefix: 'stroke-secondary',
              submitButton: 'cursor-default [&>svg]:stroke-muted-foreground [&>svg]:fill-muted-foreground',

            }}
            detachedMediaQuery="none"
            placeholder="Search NPM packages"
          />
          <div className="flex items-center space-x-2 py-3 text-zinc-500">
            <label className="flex cursor-pointer items-center space-x-2">
              <Switch
                checked={!!enableHighlight}
                onCheckedChange={toggleHighlight}
              />
              <span>Highlight matches</span>
            </label>

            <div className="grow" />
            <div className="hidden sm:block">Real-time search by</div>
            <Link href="https://www.algolia.com/" target="_blank">
              <AlgoliaIcon className="fill-zinc-500" />
            </Link>
          </div>
          {hasQuery ? (
            <>
              <Hits
                className="relative mt-2 rounded-md rounded-xs"
                classNames={{
                  list: 'space-y-4',
                }}
                hitComponent={CustomHit}
              />
              <Pagination
                className="my-4 flex justify-center"
                classNames={{
                  list: 'flex',
                  item: ' hover:bg-secondary',
                  selectedItem: 'bg-primary/20 rounded-md',
                  link: 'px-3 py-1 block',
                }}
              />
            </>
          ) : (
            <div className={`
              font-heading text-opacity-50 flex grow flex-col items-center justify-center space-y-6
              text-center text-[clamp(1.1rem,4vw,1.5rem)] text-zinc-500
            `}>
              <div>🔍</div>
              <div>
                <span className="font-semibold">Search</span>
                <span> and </span>
                <span className="font-semibold">Compare</span>
                <span> NPM packages </span>
              </div>
              <div className="text-[clamp(1rem,2vw,1.3rem)]">
                for the best-fits for your projects
              </div>
            </div>
          )}
        </InstantSearch>
      </main>
      {mounted && <PkgBasket
        selectedPkgNames={selectedPkgNames}
        setSelectedPkgNames={setSelectedPkgNames}
      />}
    </div>
  )
}

function CustomHit({ hit }: AlgoliaHitProps) {
  const [hash, setHash] = useHash()
  const hashCfg = strToObj<HashConfig>(hash) || {}
  const isSelectedPkgName = includes(hit.name, hashCfg.b || [])
  const enableHighlight = hashCfg.hl
  function onRemoveFromBasketClick(e: MouseEvent<HTMLHeadingElement>) {
    const pkgName = e?.currentTarget?.dataset?.pkgName
    const selectedPkgNames = hashCfg?.b || []
    setHash(
      objToHash({
        ...hashCfg,
        b: without([pkgName], selectedPkgNames),
      }),
    )
  }

  function onAddToBasketClick(e: MouseEvent<HTMLHeadingElement>) {
    const pkgName = e?.currentTarget?.dataset?.pkgName
    const selectedPkgNames = hashCfg?.b || []
    setHash(
      objToHash({
        ...hashCfg,
        b: uniq([...selectedPkgNames, pkgName]),
      }),
    )
  }

  return (
    <Card
      className={cn(
        `
          flex flex-col space-y-4 rounded-md border-none p-4 font-light shadow-lg
          sm:space-y-6 sm:p-8
        `,
        { 'no-highlight': !enableHighlight },
      )}
    >
      <div className="flex flex-row flex-wrap items-center gap-2">
        <h2
          className={cn(
            `
              flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-lg font-normal
              text-accent
              sm:w-auto
              md:text-2xl
            `,
            {
              'line-through': hit.isDeprecated,
              'bg-background': isSelectedPkgName,
            },
          )}
          data-pkg-name={hit.name}
          title={cn({
            'Remove from basket': isSelectedPkgName,
            'Put into basket for comparison': !isSelectedPkgName,
            '[ DEPLICATED PACKAGE! ]': hit.isDeprecated,
          })}
          onClick={
            isSelectedPkgName ? onRemoveFromBasketClick : onAddToBasketClick
          }
        >
          <Highlight
            attribute="name"
            className="break-all"
            hit={hit}
          />
        </h2>
        <div className="grow basis-full sm:basis-0" />
        <div className="flex items-center space-x-2">
          {hit.types?.ts && (
            <SiTypescript className="size-5" title="Built with TypeScript" />
          )}
          {!isNilOrEmpty(hit.dependencies) && (
            <Badge
              className={'gap-2 bg-secondary text-sm font-thin text-foreground hover:bg-secondary'}
              title={`Dependencies:\n\n${toPairs(hit.dependencies)
                .map(([name, ver], i) => ` ${i + 1}.  ${name}    ${ver} `)
                .join('\n')}`}
            >
              <ImTree />
              <span>{toPairs(hit.dependencies).length}</span>
            </Badge>
          )}

          {hit.downloadsLast30Days && (
            <Badge className={`
              gap-2 bg-secondary text-sm font-thin text-foreground
              hover:bg-secondary
            `} title="Downloads in last 30d">
              <FaDownload />
              <span>{hit.humanDownloadsLast30Days}</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {hit.owner?.avatar && (
            <Link className='flex items-center gap-2' href={hit.homepage || '#'} target="_blank" title='Homepage'>
              <img
                alt={hit.owner?.name}
                height="20"
                src={hit.owner?.avatar}
                width="20"
              />
              <div>{hit.owner?.name}</div>
            </Link>
          )}
          <div className="basis-full sm:basis-0" />
          {hit.version && (
            <Link
              href={`https://www.npmjs.com/package/${hit.name}?activeTab=versions`}
              target="_blank"
              title="Latest version. Click for all versions"
            >
              <Badge className={`
                gap-2 bg-secondary text-sm font-thin text-foreground
                hover:bg-secondary
              `}>
                <FaTag />
                <div>{hit.version} </div>
                <Dot />
                <div className="truncate">
                  {hit.versions?.[hit.version] && formatDistanceShort(
                    new Date(hit.versions?.[hit.version]!),
                    new Date(),
                    { addSuffix: true },
                  )}
                </div>
              </Badge>
            </Link>
          )}
          {hit.license && (
            <Badge className={`
              gap-2 bg-secondary text-sm font-thin text-foreground
              hover:bg-secondary
            `} title={hit.license}>
              <FaBalanceScale />
              <div className="max-w-28 truncate">
                {hit.license}
              </div>
            </Badge>
          )}
        </div>
        <div className="opacity-80" title={hit.description}>
          <Highlight attribute="description" hit={hit} />
        </div>
        {!isNilOrEmpty(hit.keywords) && (
          <div className="flex flex-wrap items-center gap-2 opacity-80">
            {pipe(
              uniq<string>,
              map(keyword => (
                <Link key={keyword} href={`/apps/npmhub?q=${keyword}`}>
                  <Badge key={keyword} className={`
                    gap-2 bg-secondary text-sm font-thin text-foreground
                    hover:bg-secondary
                  `}>
                    {keyword}
                  </Badge>
                </Link>
              )),
            )(hit.keywords!)}
          </div>
        )}
        <div className="flex flex-wrap items-center">
          <div className="flex space-x-2">
            <Link
              href={`https://www.npmjs.com/package/${hit.name}`}
              target="_blank"
            >
              <ImNpm className={externalUrlClasses} title="on NPM" />
            </Link>
            {(() => {
              const { Icon, title } =
                repoIcons[hit.repository?.host!] || { Icon: FaGithub, title: 'Github' }

              return (
                <Link href={hit.repository?.url || '#'} target="_blank">
                  <Icon className={externalUrlClasses} title={`on ${title}`} />
                </Link>
              )
            })()}
            <Link
              href={`https://openbase.com/js/${hit.name}`}
              target="_blank"
            >
              <OpenbaseIcon
                className={externalUrlClasses}
                title="on Openbase"
              />
            </Link>
            <Link
              className="group"
              href={`https://npm.runkit.com/${hit.name}`}
              target="_blank"
            >
              <SiRunkit
                className={externalUrlClasses}
                title="run on Runkit"
              />
            </Link>
          </div>
          <div className="grow" />
          <div className="flex space-x-8">
            <div className="flex items-center space-x-1">
              <h3 className={'mr-2 hidden text-xl font-semibold text-primary-foreground sm:block'}>
                CDN:
              </h3>
              <Link
                className="flex items-center justify-center py-1"
                href={`https://www.jsdelivr.com/package/npm/${hit.name}`}
                target="_blank"
                title="Open jsDelivr.com"
              >
                <JsDelivrIcon
                  className={externalUrlClasses}
                  title="Browse on JSDELIVR.COM"
                />
              </Link>
              <Link
                className="flex items-center justify-center py-1"
                href={`https://unpkg.com/browse/${hit.name}/`}
                target="_blank"
                title="Open UNPKG.COM"
              >
                <UnpkgIcon
                  className={`${externalUrlClasses} h-5 w-5`}
                  title="Browse on UNPKG.COM"
                />
              </Link>
              <Link
                className="flex items-center justify-center py-1"
                href={`https://cdnjs.com/libraries/${hit.name}/`}
                target="_blank"
                title="Open CDNJS.COM"
              >
                <CdnJsIcon
                  className={`${externalUrlClasses} h-6 w-14`}
                  title="Browse on CDNJS.COM"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function Dot({ className }: ComponentProps<'span'>) {
  return (
    <span className={cn('px-1 text-[4px] opacity-30', className)}>●</span>
  )
}

function objToHash(obj: Record<string, unknown> = {}): string {
  return pipe(reject(isNilOrEmptyOrFalsy), objToStr)(obj) || ''
}
