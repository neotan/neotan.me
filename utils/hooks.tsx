import { useMemo } from 'react'
import Fuse from 'fuse.js'

export function useFuse<T>(
  list: T[],
  searchTerm: string,
  fuseOptions?: Fuse.IFuseOptions<T>,
) {
  const fuse = useMemo(() => {
    return new Fuse(list, fuseOptions)
  }, [list, fuseOptions])

  const results = useMemo(() => {
    return fuse.search(searchTerm)
  }, [fuse, searchTerm])

  return results
}
