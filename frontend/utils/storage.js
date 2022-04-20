const path = require('path')
const fsx = require('fs-extra')
const {parse, stringify} = require('superjson').default

function getDbPath() {
  return path.join(process.cwd(), '.temp', 'mdxs.temp-db.json')
}

function slugAsKey(mdxs) {
  return mdxs.reduce((acc, mdx) => {
    acc[mdx.slug] = mdx
    return acc
  }, {})
}

async function getAllMdxs() {
  const data = await fsx.readFile(getDbPath())

  return parse(data)
}

async function getMdx(slug) {
  const data = await fsx.readFile(getDbPath())

  return parse(data)[slug]
}

function saveMdxs(mdxs, dbPath = getDbPath()) {
  fsx.ensureDirSync(path.dirname(dbPath))
  return fsx.writeFile(dbPath, stringify(slugAsKey(mdxs)))
}

module.exports = {
  getAllMdxs,
  getMdx,
  saveMdxs,
}
