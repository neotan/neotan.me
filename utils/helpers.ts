import { format, toDate } from 'date-fns'
import { anyPass, isEmpty, isNil } from 'ramda'
import { BlogSearchIndex, MdxPage } from '~/types'

export function noop() {
  console.log('[noop]: empty function execcuted')
}

export const isBrowser = typeof window !== 'undefined'

export function isNilOrEmpty(value) {
  return anyPass([isNil, isEmpty])(value)
}

export function isNilOrEmptyOrFalsy(value) {
  return anyPass([isNil, isEmpty, () => value === false])(value)
}

export function formatDate(date, dateFormat = 'yyyy-MM-dd') {
  return date instanceof Date
    ? format(toDate(date), dateFormat)
    : format(new Date(date), dateFormat)
}

export function isNumber(num: unknown) {
  if (typeof num === 'number') {
    return num - num === 0
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
  }
  return false
}

export function formatNumber(
  x: number | bigint | string,
  options?: Intl.NumberFormatOptions,
  locales: string | string[] = 'en-US',
): string {
  if (!isNumber(x)) return String(x)
  return new Intl.NumberFormat(locales, options).format(Number(x))
}

export function mdxToIndex({
  slug,
  content,
  frontmatter,
}: Pick<MdxPage, 'slug' | 'content' | 'frontmatter'>): BlogSearchIndex {
  const { title, date, catalog, cloudinaryImgPubId, tags, description } =
    frontmatter

  return {
    slug,
    title,
    content,
    url: `/blog/${slug}`,
    cloudinaryImgPubId,
    tags,
    description,
    date: formatDate(date, 'yyyy-MM-dd'),
  }
}

// module.exports = {
//   noop,
//   isBrowser,
//   formatDate,
//   isNumber,
//   formatNumber,
// }
