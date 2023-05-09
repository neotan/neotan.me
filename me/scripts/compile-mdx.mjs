import fsx from 'fs-extra'
import fs from 'fs'
import { stringify } from 'superjson'
import path from 'path'
import { values } from 'ramda'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import calcReadTime from 'reading-time'

function isMdxFile(filename) {
  const mdxRegexp = /.mdx?$/
  return mdxRegexp.test(filename)
}

function makeImgUrl(imgFileName, basePath) {
  return `/${basePath}/${imgFileName}`.replace().replace(/\\/g, '/')
}

function extractSlug(filePath) {
  try {
    return path.basename(filePath.replace(/(index)?.mdx?$/, ''))
  } catch (error) {
    throw new Error(`Extracting slug from ${filePath} failed.`)
  }
}

function saveFile(data, dbPath) {
  // console.log({ data })
  fsx.ensureDirSync(path.dirname(dbPath))
  return fsx.writeFile(dbPath, stringify(data))
}

function* readAllFiles(dir) {
  const files = fsx.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name))
    } else {
      if (isMdxFile(file.name)) {
        yield path.join(dir, file.name)
      }
    }
  }
}

const mdxRootPath = process.argv[2];
(async function main() {
  if (!fsx.statSync(mdxRootPath).isDirectory()) {
    throw new Error(`${mdxRootPath} is invalid path for MDX source files.`)
  }

  fsx.copySync('content', 'public/content')
  const postFiles = {}

  for (const filePath of readAllFiles(mdxRootPath)) {
    const slug = extractSlug(filePath)
    const source = fs.readFileSync(filePath)
    const { content, data: meta } = matter(source)

    postFiles[slug] = {
      slug,
      filePath,
      content,
      meta: {
        ...meta,
        slug,
        imgSrc: meta.imgSrc ? makeImgUrl(meta.imgSrc, path.dirname(filePath)) : '',
        readTime: calcReadTime(content).text,
      }
    }
  }

  await saveFile(postFiles, 'public/db.json')
  const result = values(postFiles).map(({ slug, filePath }) => ({ slug, filePath }))
  console.log(result, `\n${result.length} MDX files were compiled into.`)
})()
