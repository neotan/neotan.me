import type { SendEventForHits } from 'instantsearch.js/es/lib/utils'
import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types'

export type AlgoliaHitProps = {
  hit: AlgoliaHit<AlgoliaNpmPkgMeta>
  sendEvent?: SendEventForHits
  selectedPkgNames?: string[]
}

export type AlgoliaNpmPkgMeta = {
  rev: string
  name: string
  downloadsLast30Days: number
  downloadsRatio: number
  humanDownloadsLast30Days: string
  jsDelivrHits: number
  popular: boolean
  version: string
  versions: Record<string, string>
  tags: {
    latest: string
    stable?: string
    prerelease?: string
  }
  description: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  originalAuthor: RepoAuthor
  repository?: Repository
  githubRepo?: Repository
  gitHead?: string
  readme: string
  owner: RepoAuthor
  deprecated: boolean
  isDeprecated: boolean
  deprecatedReason?: null
  isSecurityHeld: boolean
  homepage?: string
  license: string
  keywords?: string[]
  computedKeywords?: string[]
  computedMetadata: Record<string, unknown>
  created: number
  modified: number
  lastPublisher: RepoAuthor
  owners?: RepoAuthor[]
  bin: {
    rae?: string
    undecided?: string
    raen?: string
  }
  humanDependents: string
  dependents: number
  types: { ts?: 'included' }
  moduleTypes?: string[]
  styleTypes?: string[]
  changelogFilename?: string
  lastCrawl: string
  _searchInternal: _SearchInternal
  objectID: string
  _highlightResult: _HighlightResult
}

export interface Repository {
  branch: string
  head?: string
  host: string
  path: string
  project: string
  type: string
  url: string
  user: string
}

export interface RepoAuthor {
  name: string
  avatar?: string
  link?: string
  url?: string
  email?: string
}

export interface _SearchInternal {
  alternativeNames?: string[]
  popularAlternativeNames?: string[]
  expiresAt: number
  downloadsMagnitude: number
  jsDelivrPopularity: number
}

export interface _HighlightResult {
  name: _HighlightedShape
  description: _HighlightedShape
  owner: {
    name: _HighlightedShape
  }
  keywords?: _HighlightedShape[]
  owners?: {
    name: _HighlightedShape
  }[]
}

export interface _HighlightedShape {
  value: string
  matchLevel: string
  fullyHighlighted?: boolean
  matchedWords?: string[]
}
