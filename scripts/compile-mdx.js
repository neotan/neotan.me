const path = require('path')
const fsx = require('fs-extra')
const stringify = require('json-stringify-safe')
const { getAllMdxs } = require('./mdx')

const mdxRootPath = process.argv[2]
  ; (async function compileMdx() {
    if (!fsx.statSync(mdxRootPath).isDirectory()) {
      throw new Error(`${mdxRootPath} is invalid.`)
    }
    try {
      const mdxs = await getAllMdxs(mdxRootPath)
      await saveFile(mdxs, 'public/db.json')
      const result = mdxs?.map(({ slug, filePath }) => ({ slug, filePath }))
      console.log(result, `\n${result.length} MDX files were compiled into.`)
    } catch (error) {
      throw new Error(`WRITING_MDX_JSON_FAILED: `, { cause: error })
    }
  })()

function saveFile(mdxs, dbPath = makeDbPath()) {
  fsx.ensureDirSync(path.dirname(dbPath))
  return fsx.writeFile(dbPath, stringify(slugAsKey(mdxs)))
}

function makeDbPath() {
  return path.join(process.cwd(), '.temp', 'mdxs.temp-db.json')
}

function slugAsKey(mdxs) {
  return mdxs.reduce((acc, mdx) => {
    acc[mdx.slug] = mdx
    return acc
  }, {})
}
