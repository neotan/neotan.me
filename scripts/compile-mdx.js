const fsx = require('fs-extra')
const {getAllMdxs} = require('../utils/mdx')
const {saveMdxs} = require('../utils/storage')

const mdxRootPath = process.argv[2]

;(async function () {
  if (!fsx.statSync(mdxRootPath).isDirectory()) {
    throw new Error(`${mdxRootPath} is invalid.`)
  }
  try {
    const mdxs = await getAllMdxs(mdxRootPath)
    await saveMdxs(mdxs)
    const result = mdxs?.map(({slug, filePath}) => ({slug, filePath}))
    console.log(result, `\n${result.length} MDX files were compiled.`)
  } catch (error) {
    throw error
  }
})()
