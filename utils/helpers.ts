import format from 'date-fns/format'
import toDate from 'date-fns/toDate'

export function noop() {
  console.log('[noop]: empty function execcuted')
}

export function isBrowser() {
  return typeof window !== 'undefined'
}

export function formatDate(date, dateFormat = 'yyyy-MM-dd') {
  return date instanceof Date
    ? format(toDate(date), dateFormat)
    : format(new Date(date), dateFormat)
}
