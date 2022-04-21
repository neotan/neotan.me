const path = require('path')
const readfiles = require('node-readfiles')
const calcReadTime = require('reading-time')
const {bundleMDX} = require('mdx-bundler')

function isMdxFile(filename) {
  const mdxRegexp = /.mdx?$/
  return mdxRegexp.test(filename)
}

function extractSlug(filePath) {
  try {
    // TODO: format slug w/ -
    return path.basename(filePath.replace(/index.mdx?$/, ''))
  } catch (error) {
    console.error(`Extracting slug from ${filePath}`)
    throw error
  }
}

const remarkPlugins = []
const rehypePlugins = []

async function compileMdx(mdxSource) {
  const {code, frontmatter} = await bundleMDX({
    source: mdxSource,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...rehypePlugins,
      ]

      return options
    },
  })

  return {
    frontmatter,
    code,
  }
}

async function getAllMdxs(mdxRootPath) {
  if (path.is) throw new Error('MDX root folder is required.')

  try {
    const rawMdxs = []
    await readfiles(
      mdxRootPath,
      {filenameFormat: readfiles.FULL_PATH},
      (err, filePath, mdxSource) => {
        if (err) throw err

        if (isMdxFile(filePath)) {
          rawMdxs.push({
            filePath,
            mdxSource,
          })
        }
      },
    )

    const result = []
    for (const rawMdx of rawMdxs) {
      const {filePath, mdxSource} = rawMdx
      const compiled = await compileMdx(mdxSource)
      result.push({
        slug: extractSlug(filePath),
        filePath,
        readTime: calcReadTime(mdxSource),
        ...compiled,
      })
    }
    return result
  } catch (error) {
    console.error(`Parsing MDX files in ${mdxRootPath}}`)
    throw error
  }
}

module.exports = {getAllMdxs}
