import {format,add,parseISO} from 'date-fns'

export function noop() {
  console.log('[noop]: empty function execcuted')
}

export function isBrowser() {
  return typeof window !== 'undefined'
}

export function  formatDate(dateStr: string | Date) {
  if (typeof dateStr !== 'string') {
    dateStr = format(dateStr, 'yyyy-MM-dd')
  }
  return format(
    add(parseISO(dateStr), {
      minutes: new Date().getTimezoneOffset(),
    }),
    'PPP',
  )
}