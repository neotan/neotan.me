const dotenv = require('dotenv')
const algoliasearch = require('algoliasearch/lite')
const {pluck, pipe, sort} = require('ramda')
const formatDate = require('date-fns/format')
const {getAllMdxs} = require('../utils/mdx')

function transformMdx({slug, code, content, frontmatter}) {
  const {title, date, catalog, cloudinaryImgPubId} = frontmatter
  console.log({frontmatter})
  return {
    objectID: slug,
    title,
    catalog,
    cloudinaryImgPubId,
    date: formatDate(new Date(date), 'yyyy-MM-dd'),
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

    const algoliaRes = await client
      .initIndex('prod_neotan.me')
      .saveObjects(transformed)

    console.log(
      `\n🎉🎉🎉 Sucessfully added ${
        algoliaRes.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaRes.objectIDs.join(
        '\n',
      )}`,
    )
  } catch (error) {
    console.error(error)
  }
})()
