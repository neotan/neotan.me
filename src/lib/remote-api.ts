import { type PageBlogPost, type Product } from '@/types/contentful-schema'

const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  tags
  featured
  publishedDate
  coverImage {
    url
  }
  author {
    name
    avatar {
      url
    }
  }
  content
`

const PRODUCT_GRAPHQL_FIELDS = `
  slug
  title
  description
  seoFields {
    pageTitle
    pageDescription
    canonicalUrl
  }
  featured
  link
  tags
  repositoryLink
  version
  coverImage {
    url
  }
  coverVideo {
    url
  }
`

type PostsResponse = { data: { pageBlogPostCollection: { items: PageBlogPost[] } } }
type ProductsResponse = { data: { productCollection: { items: Product[] } } }

async function fetchGraphQL<T>(query: string): Promise<T> {
  const response = await fetch(
    `${process.env.CONTENTFUL_GRAPHQL_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    },
  )
  return response.json() as Promise<T>
}

function extractPost(fetchResponse: PostsResponse) {
  return fetchResponse?.data?.pageBlogPostCollection?.items?.[0]
}

function extractPosts(fetchResponse: PostsResponse) {
  return fetchResponse?.data?.pageBlogPostCollection?.items
}

export async function getAllPosts() {
  const res = await fetchGraphQL<PostsResponse>(
    `query {
      pageBlogPostCollection(where: { slug_exists: true }, order: publishedDate_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
  )
  return extractPosts(res)
}

export async function getPostAndMorePosts(slug: string,) {
  const [singlePost, morePosts] = await Promise.all([
    fetchGraphQL<PostsResponse>(
      `query {
        pageBlogPostCollection(where: { slug: "${slug}" }, limit: 1) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
    ),
    fetchGraphQL<PostsResponse>(
      `query {
        pageBlogPostCollection(where: { slug_not_in: "${slug}" }, order: publishedDate_DESC, limit: 2) {
          items {
            ${POST_GRAPHQL_FIELDS}
          }
        }
      }`,
    )
  ])

  return {
    post: extractPost(singlePost),
    morePosts: extractPosts(morePosts),
  }
}

function extractProducts(fetchResponse: ProductsResponse) {
  return fetchResponse?.data?.productCollection?.items
}

export async function getAllProducts() {
  const res = await fetchGraphQL<ProductsResponse>(
    `query {
      productCollection(where: { slug_exists: true }, order: publishedDate_DESC) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`,
  )
  return extractProducts(res)
}