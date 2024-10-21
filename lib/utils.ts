import { type ClassValue, clsx } from 'clsx'
import { format, formatDistance, isValid, type Locale, parseISO, toDate } from 'date-fns'
import { anyPass, isEmpty, isNil } from 'ramda'
import rison from 'rison'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function noop() {
  console.log('[noop]: empty function execcuted')
}

export const isBrowser = typeof window !== 'undefined'

export const isDevMode = process?.env?.NODE_ENV === 'development'

export function isNilOrEmptyOrFalsy(value: unknown) {
  return anyPass([isNil, isEmpty, () => value === false])(value)
}

const SHORT_DATE_TIME = [
  { long: 'years', short: 'yr' },
  { long: 'year', short: 'yr' },
  { long: 'months', short: 'mo' },
  { long: 'month', short: 'mo' },
  { long: 'days', short: 'd' },
  { long: 'day', short: 'd' },
  { long: 'hours', short: 'hr' },
  { long: 'hour', short: 'hr' },
  { long: 'minutes', short: 'min' },
  { long: 'minute', short: 'min' },
  { long: 'seconds', short: 's' },
  { long: 'second', short: 's' },
]
export function formatDistanceShort(
  start: Date,
  end: Date,
  options: {
    includeSeconds?: boolean
    addSuffix?: boolean
    locale?: Locale
  },
) {
  const formated = formatDistance(start, end, options)

  return SHORT_DATE_TIME.reduce(
    (acc, { long, short }) => acc.replace(long, short),
    formated,
  )
}

export function isNilOrEmpty(x: unknown) {
  return x == null || x === '' || (isObject(x) ? Object.keys(x).length === 0 : Array.isArray(x) && x.length === 0)
}

export function isNumber(num: unknown) {
  if (num === Infinity) return true

  if (typeof num === 'number') {
    return num - num === 0
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
  }
  return false
}

export function isObject(x: unknown) {
  return Object.prototype.toString.call(x) === '[object Object]'
}

export function formatDate(date: Date | number | string, dateFormat = 'yyyy-MM-dd') {
  if (!date || !isValid(new Date(date))) return ''

  if (date instanceof Date || typeof date === 'number') {
    // ref: https://stackoverflow.com/a/31732581/5104886
    const adjustedDate = new Date(toDate(date).toISOString().replace(/-/g, '/').replace(/T.+/, ''))
    return format(adjustedDate, dateFormat)
  }

  return format(parseISO(date), dateFormat)
}

export function formatNumber(
  x: unknown,
  options?: Intl.NumberFormatOptions,
  locales: string | string[] = 'en-US'
): string {
  if (!isNumber(x)) return x as string

  return new Intl.NumberFormat(locales, options).format(Number(x))
}

export function strToObj<T>(str: string): T | null {
  if (!str) return null
  try {
    return rison.decode(str.replace(/^#/, ''))
  } catch (error) {
    console.error(error)
    return null
  }
}

export function objToStr(obj: Record<string, unknown>): string | undefined {
  if (isNilOrEmpty(obj)) return ''
  try {
    return rison.encode(obj)
  } catch (error) {
    console.error(error)
  }
}