export function noop() {
  console.log('[noop]: empty function execcuted')
}

export function isBrowser() {
  return typeof window !== 'undefined'
}
