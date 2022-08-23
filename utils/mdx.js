const path = require('path')
const readfiles = require('node-readfiles')
const calcReadTime = require('reading-time')
const { bundleMDX } = require('mdx-bundler')

function isMdxFile(filename) {
  const mdxRegexp = /.mdx?$/
  return mdxRegexp.test(filename)
}

function extractSlug(filePath) {
  try {
    // TODO: format slug w/ -
    return path.basename(filePath.replace(/(index)?.mdx?$/, ''))
  } catch (error) {
    console.error(`Extracting slug from ${filePath}`)
    throw error
  }
}

const remarkPlugins = []
const rehypePlugins = []

async function compileMdx(mdxSource) {
  const { default: gfm } = await import('remark-gfm')
  const { default: autolinkHeadings } = await import('remark-autolink-headings')
  const { default: remarkSlug } = await import('remark-slug')
  const { default: remarkPrism } = await import('remark-prism')
  const { default: remarkImages } = await import('remark-images')

  const {
    code,
    frontmatter,
    matter: { content },
  } = await bundleMDX({
    source: mdxSource,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkPrism, { transformInlineCode: true }], // TODO: add line-numbers
        remarkSlug,
        remarkImages,
        [autolinkHeadings, { behavior: 'wrap' }],
        gfm,
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
    content,
  }
}

async function getAllMdxs(mdxRootPath) {
  if (!mdxRootPath) throw new Error('MDX root folder is required.')

  try {
    const rawMdxs = []
    await readfiles(
      mdxRootPath,
      { filenameFormat: readfiles.FULL_PATH },
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
      const { filePath, mdxSource } = rawMdx
      const compiled = await compileMdx(mdxSource)
      result.push({
        slug: extractSlug(filePath),
        filePath,
        readTime: calcReadTime(mdxSource),
        mdxSource,
        ...compiled,
      })
    }
    return result
  } catch (error) {
    console.error(`Parsing MDX files in ${mdxRootPath}}`)
    throw error
  }
}

module.exports = { getAllMdxs }
