'use client'
import React, { type MouseEvent, useEffect, useState, type ComponentProps } from 'react'

import Link from 'next/link'

import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { history } from 'instantsearch.js/es/lib/routers'
import { type RouterProps } from 'instantsearch.js/es/middlewares/createRouterMiddleware'
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
import { env } from '@/env'
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

const INDEX_NAME = env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

const algoliaClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
)
const searchClient = {
  ...algoliaClient,
  search(requests: Array<{ params: { query?: string } }>) {
    if (
      requests.every(
        ({ params }: { params: { query?: string } }) => !params.query,
      )
    ) {
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

    return algoliaClient.search(requests as Parameters<typeof algoliaClient.search>[0])
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

const externalUrlClasses = 'h-5 w-5 cursor-pointer fill-muted-foreground hover:fill-foreground transition-colors'

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
  const hashCfg = strToObj<HashConfig>(hash) ?? {}
  const selectedPkgNames: string[] = hashCfg?.b ?? []

  function setSelectedPkgNames(pkgNames: string[]) {
    setHash(objToHash({ ...hashCfg, b: pkgNames }))
  }

  return (
    <div suppressHydrationWarning className="mx-auto w-full flex-1 px-4 py-6">
      <main className="mx-auto flex max-w-4xl flex-col">
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
            className="input-bordered rounded-lg border-border bg-card/50 backdrop-blur-sm"
            classNames={{
              form: '!rounded-lg focus-within:!border-primary/50 !shadow-lg !shadow-primary/5',
              inputWrapperPrefix: 'stroke-muted-foreground',
              submitButton: 'cursor-default [&>svg]:stroke-muted-foreground [&>svg]:fill-muted-foreground',
            }}
            detachedMediaQuery="none"
            placeholder="Search NPM packages..."
          />
          <div className="flex items-center justify-end space-x-2 py-4 text-muted-foreground">
            <div className="hidden text-sm sm:block">Real-time search by</div>
            <Link href="https://www.algolia.com/" target="_blank">
              <AlgoliaIcon className="fill-muted-foreground transition-colors hover:fill-foreground" />
            </Link>
          </div>
          {hasQuery ? (
            <>
              <Hits
                classNames={{
                  list: 'space-y-6',
                }}
                hitComponent={CustomHit}
              />
              <Pagination
                className="my-8 flex justify-center"
                classNames={{
                  list: 'flex gap-2',
                  item: 'hover:bg-secondary/50 rounded-md transition-colors',
                  selectedItem: 'bg-primary/10 text-primary rounded-md',
                  link: 'px-4 py-2 block',
                }}
              />
            </>
          ) : (
            <div className={`
              font-heading flex grow flex-col items-center justify-center space-y-8 py-16
              text-center text-[clamp(1.2rem,4vw,1.8rem)] text-muted-foreground
            `}>
              <div className="text-6xl">🔍</div>
              <div className="space-y-2">
                <div className="font-semibold text-foreground">
                  Search and Compare NPM packages
                </div>
                <div className="text-[clamp(1rem,2vw,1.2rem)] text-muted-foreground">
                  Find the best packages for your projects
                </div>
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
  const hashCfg = strToObj<HashConfig>(hash) ?? {}
  const isSelectedPkgName = includes(hit.name, hashCfg.b ?? [])
  function onRemoveFromBasketClick(e: MouseEvent<HTMLHeadingElement>) {
    const pkgName = e?.currentTarget?.dataset?.pkgName
    const selectedPkgNames = hashCfg?.b ?? []
    setHash(
      objToHash({
        ...hashCfg,
        b: without([pkgName], selectedPkgNames),
      }),
    )
  }

  function onAddToBasketClick(e: MouseEvent<HTMLHeadingElement>) {
    const pkgName = e?.currentTarget?.dataset?.pkgName
    const selectedPkgNames = hashCfg?.b ?? []
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
          group relative gap-6 overflow-hidden rounded-xl border-border/50 bg-card/50 p-6 shadow-sm
          backdrop-blur-sm transition-all duration-200
        `,
        {
          'bg-primary/5 ring-2 ring-primary/20': isSelectedPkgName,
        }
      )}
    >
      {/* Header Section */}
      <div className={`
        flex flex-col space-y-4
        sm:flex-row sm:items-start sm:justify-between sm:space-y-0
      `}>
        <div
          className="flex-1 space-y-3"
        >
          <h2
            className={cn(
              `
                flex cursor-pointer items-center space-x-3 text-xl font-semibold text-foreground
                transition-colors
                hover:text-accent
                sm:text-2xl
              `,
              {
                'line-through opacity-60': hit.isDeprecated,
                'text-accent': isSelectedPkgName,
              },
            )}
            data-pkg-name={hit.name}
            title={cn({
              'Remove from basket': isSelectedPkgName,
              'Add to basket for comparison': !isSelectedPkgName,
              '[ DEPRECATED PACKAGE! ]': hit.isDeprecated,
            })}
            onClick={isSelectedPkgName ? onRemoveFromBasketClick : onAddToBasketClick}

          >
            <Highlight
              attribute="name"
              classNames={{
                highlighted: 'bg-primary/20 text-inherit font-bold',
              }}
              hit={hit}
            />
            {hit.types?.ts && (
              <SiTypescript className="size-5 text-blue-500" title="Built with TypeScript" />
            )}
          </h2>

          {/* Description */}
          <div
            className="leading-relaxed text-muted-foreground"
            data-pkg-name={hit.name}
            title={hit.description}
          >
            <Highlight
              attribute="description"
              classNames={{
                highlighted: 'bg-primary/10 text-primary font-medium',
              }}
              hit={hit}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
          {hit.downloadsLast30Days && (
            <Badge
              className="gap-1.5 text-xs"
              title="Downloads in last 30d"
              variant="secondary"
            >
              <FaDownload className="size-3" />
              <span>{hit.humanDownloadsLast30Days}</span>
            </Badge>
          )}
          {!isNilOrEmpty(hit.dependencies) && (
            <Badge
              className="gap-1.5 text-xs"
              title={`Dependencies:\n\n${toPairs(hit.dependencies)
                .map(([name, ver], i) => ` ${i + 1}.  ${name}    ${ver} `)
                .join('\n')}`}
              variant="secondary"
            >
              <ImTree className="size-3" />
              <span>{toPairs(hit.dependencies).length}</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Metadata Section */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        {hit.owner?.avatar && (
          <Link
            className='flex items-center gap-2 transition-colors hover:text-foreground'
            href={hit.homepage ?? '#'}
            target="_blank"
            title='Homepage'
          >
            <img
              alt={hit.owner?.name}
              className="rounded-full"
              height="20"
              src={hit.owner?.avatar}
              width="20"
            />
            <span className="font-medium">{hit.owner?.name}</span>
          </Link>
        )}

        {hit.version && (
          <Link
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            href={`https://www.npmjs.com/package/${hit.name}?activeTab=versions`}
            target="_blank"
            title="Latest version. Click for all versions"
          >
            <FaTag className="size-3" />
            <span className="font-medium">{hit.version}</span>
            <Dot />
            <span className="text-xs">
              {(() => {
                const versionDate = hit.versions?.[hit.version]
                return versionDate && formatDistanceShort(
                  new Date(versionDate),
                  new Date(),
                  { addSuffix: true },
                )
              })()}
            </span>
          </Link>
        )}

        {hit.license && (
          <div className="flex items-center gap-1.5" title={hit.license}>
            <FaBalanceScale className="size-3" />
            <span className="max-w-28 truncate font-medium">
              {hit.license}
            </span>
          </div>
        )}
      </div>

      {/* Keywords Section */}
      {!isNilOrEmpty(hit.keywords) && (
        <div className="flex flex-wrap items-center gap-2">
          {pipe(
            uniq<string>,
            map(keyword => (
              <Link key={keyword} href={`/apps/npmhub?q=${keyword}`}>
                <Badge
                  className="text-xs transition-colors hover:bg-secondary/50"
                  variant="outline"
                >
                  {keyword}
                </Badge>
              </Link>
            )),
          )(hit.keywords!)}
        </div>
      )}

      {/* Action Buttons Section - Keeping as requested */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex space-x-3">
          <Link
            href={`https://www.npmjs.com/package/${hit.name}`}
            target="_blank"
          >
            <ImNpm className={externalUrlClasses} title="on NPM" />
          </Link>
          {(() => {
            const { Icon, title } =
              repoIcons[hit.repository?.host ?? ''] ?? { Icon: FaGithub, title: 'Github' }

            return (
              <Link href={hit.repository?.url ?? '#'} target="_blank">
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
        <div className="flex space-x-8">
          <div className="flex items-center space-x-1">
            <h3 className='mr-2 hidden text-xl font-semibold text-primary-foreground sm:block'>
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
    </Card>
  )
}

function Dot({ className }: ComponentProps<'span'>) {
  return (
    <span className={cn('px-1 text-[4px] opacity-30', className)}>●</span>
  )
}

function objToHash(obj: Record<string, unknown> = {}): string {
  return pipe(reject(isNilOrEmptyOrFalsy), objToStr)(obj) ?? ''
}
