/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: neotan                                            ##
 * ## SOURCE: https://api.stoplight.io/v1/versions/9WaNJfGpnnQ76opqe/export/oas.json ##
 * ---------------------------------------------------------------
 */

export type ImagePath = string | null

export interface MovieListObject {
  poster_path?: ImagePath
  adult?: boolean
  overview?: string
  release_date?: string
  genre_ids?: number[]
  id?: number
  original_title?: string
  original_language?: string
  title?: string
  backdrop_path?: ImagePath
  popularity?: number
  vote_count?: number
  video?: boolean
  vote_average?: number
}

export interface MovieListResultWithRatingObject {
  adult?: boolean
  backdrop_path?: ImagePath
  genre_ids?: number[]
  id?: number
  original_language?: string
  original_title?: string
  overview?: string
  release_date?: string
  poster_path?: ImagePath
  popularity?: number
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  rating?: number
}

export interface MovieListResultsObjectWithMediaType {
  poster_path?: ImagePath
  adult?: boolean
  overview?: string
  release_date?: string
  original_title?: string
  genre_ids?: number[]
  id?: number
  media_type: 'movie'
  original_language?: string
  title?: string
  backdrop_path?: ImagePath
  popularity?: number
  vote_count?: number
  video?: boolean
  vote_average?: number
}

export interface PersonListResultObjectWithMediaType {
  profile_path?: ImagePath
  adult?: boolean
  id?: number
  media_type: 'person'
  known_for?: (
    | MovieListResultsObjectWithMediaType
    | TvListResultsObjectWithMediaType
  )[]
  name?: string
  popularity?: number
}

export interface PersonListResultsObject {
  profile_path?: ImagePath
  adult?: boolean
  id?: number
  known_for?: (
    | MovieListResultsObjectWithMediaType
    | TvListResultsObjectWithMediaType
  )[]
  name?: string
  popularity?: number
}

export interface TvListResultObject {
  poster_path?: ImagePath
  popularity?: number
  id?: number
  backdrop_path?: ImagePath
  vote_average?: number
  overview?: string
  first_air_date?: string
  origin_country?: string[]
  genre_ids?: number[]
  original_language?: string
  vote_count?: number
  name?: string
  original_name?: string
}

export interface TvListResultWithRatingObject {
  backdrop_path?: ImagePath
  first_air_date?: string
  genre_ids?: number[]
  id?: number
  original_language?: string
  original_name?: string
  overview?: string
  origin_country?: string[]
  poster_path?: ImagePath
  popularity?: number
  name?: string
  vote_average?: number
  vote_count?: number
  rating?: number
}

export interface TvListResultsObjectWithMediaType {
  poster_path?: ImagePath
  popularity?: number
  id?: number
  overview?: string
  backdrop_path?: ImagePath
  vote_average?: number
  media_type: 'tv'
  first_air_date?: string
  origin_country?: string[]
  genre_ids?: number[]
  original_language?: string
  vote_count?: number
  name?: string
  original_name?: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}
