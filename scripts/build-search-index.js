const dotenv = require('dotenv')
const algoliasearch = require('algoliasearch/lite')
const {pluck, pipe, sort} = require('ramda')
const {getAllMdxs} = require('../utils/mdx')

function transformMdx({slug, code, content, frontmatter}) {
  const {title, date} = frontmatter
  return {
    objectID: slug,
    title,
    date,
    content,
  }
}

;(async function () {
  if (process.env.NODE_ENV === 'development') {
    dotenv.config({
      path: '.env.local',
    })
  }
  try {
    const mdxs = await getAllMdxs(process.argv[2])
    const transformed = mdxs.map(transformMdx)
   
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY,
    )
    console.log(
      pipe(
        pluck('objectID'),
        sort(function (a, b) {
          return a - b
        }),
      )(transformed),
    )
    const index = client.initIndex('prod_neotan.me')
    const algoliaRes = await index.saveObjects(transformed)
    console.log(
      `🎉🎉🎉 Sucessfully added ${
        algoliaRes.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaRes.objectIDs.join(
        '\n',
      )}`,
    )
  } catch (error) {
    console.error(error)
  }
})()
