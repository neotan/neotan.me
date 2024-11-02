import ky, { type Options } from 'ky'

import { isDevMode } from '@/lib/utils'
import type {
  BlogPagesCreateData,
  BlogPagesCreateError,
  BlogPagesCreateResponse,
  BlogPagesDestroyData,
  BlogPagesDestroyError,
  BlogPagesDestroyResponse,
  BlogPagesListError,
  BlogPagesListResponse,
  BlogPagesPartialUpdateData,
  BlogPagesPartialUpdateError,
  BlogPagesPartialUpdateResponse,
  BlogPagesRetrieveData,
  BlogPagesRetrieveError,
  BlogPagesRetrieveResponse,
  BlogPagesUpdateData,
  BlogPagesUpdateError,
  BlogPagesUpdateResponse,
  BlogPostsCreateData,
  BlogPostsCreateError,
  BlogPostsCreateResponse,
  BlogPostsDestroyData,
  BlogPostsDestroyError,
  BlogPostsDestroyResponse,
  BlogPostsListError,
  BlogPostsListResponse,
  BlogPostsPartialUpdateData,
  BlogPostsPartialUpdateError,
  BlogPostsPartialUpdateResponse,
  BlogPostsRetrieveData,
  BlogPostsRetrieveError,
  BlogPostsRetrieveResponse,
  BlogPostsUpdateData,
  BlogPostsUpdateError,
  BlogPostsUpdateResponse,
  Page,
  Post,
  SchemaRetrieveData,
  SchemaRetrieveError,
  SchemaRetrieveResponse
} from '@/types'

type Item = {
  id?: string
  slug?: string
  [key: string]: unknown
}
type Result = { [key: string]: Item };


function arrayToObject(arr: Item[]) {
  return arr.reduce<Result>((acc, cur) => {
    const key = cur?.slug || cur?.id || 'NO_ID_OR_SLUG'
    acc[key] = cur
    return acc
  }, {})
}

const client = ky.create({
  prefixUrl: isDevMode ? 'http://127.0.0.1:8888/api' : 'https://neo-blog-backend.vercel.app/api',
  hooks: {
    // afterResponse: [
    //   async (_request, _options, response) => {
    //     const data = await response.json()
    //     const transformedData = Array.isArray(data) ? arrayToObject(data) : data
    //     return new Response(JSON.stringify(transformedData), {
    //       status: response.status,
    //       headers: response.headers,
    //     })
    //   },
    // ]
  }
})

export function blogPagesList(options: Options = {}) {
  return client.get('blog/pages/', options)
    .json<Page[]>()
};

export function blogPagesCreate(options: Options = {}) {
  return client.post('blog/pages/', options)
    .json<BlogPagesCreateResponse>()
};

export function blogPagesRetrieve(id: string, options: Options = {}) {
  return client.get(`blog/pages/${id}/`, options)
    .json<BlogPagesRetrieveResponse>()
};

export function blogPagesUpdate(id: string, options: Options = {}) {
  return client.put(`blog/pages/${id}/`, options)
    .json<BlogPagesUpdateResponse>()
};

export function blogPagesPartialUpdate(id: string, options: Options = {}) {
  return client.patch(`blog/pages/${id}/`, options)
    .json<BlogPagesPartialUpdateResponse>()
};

export function blogPagesDestroy(id: string, options: Options = {}) {
  return client.delete(`blog/pages/${id}/`, options)
    .json<BlogPagesDestroyResponse>()
};

export function blogPostsList(options: Options = {}) {
  return client.get('blog/posts/', options)
    .json<BlogPostsListResponse>()
};

export function blogPostsCreate(options: Options = {}) {
  return client.post('blog/posts/', options)
    .json<BlogPostsCreateResponse>()
};

export function blogPostsRetrieve(id: string, options: Options = {}) {
  return client.get(`blog/posts/${id}/`, options)
    .json<BlogPostsRetrieveResponse>()
};

export function blogPostsUpdate(id: string, options: Options = {}) {
  return client.put(`blog/posts/${id}/`, options)
    .json<BlogPostsUpdateResponse>()
};

export function blogPostsPartialUpdate(id: string, options: Options = {}) {
  return client.patch(`blog/posts/${id}/`, options)
    .json<BlogPostsPartialUpdateResponse>()
};

export function blogPostsDestroy(id: string, options: Options = {}) {
  return client.delete(`blog/posts/${id}/`, options)
    .json<BlogPostsDestroyResponse>()
};

export function schemaRetrieve(options: Options = {}) {
  return client.get('schema/', options)
    .json<SchemaRetrieveResponse>()
};