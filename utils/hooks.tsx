import * as React from 'react'
import Fuse from 'fuse.js'

export function useFuse<T>(
  list: T[],
  searchTerm: string,
  fuseOptions?: Fuse.IFuseOptions<T>,
) {
  const fuse = React.useMemo(() => {
    return new Fuse(list, fuseOptions)
  }, [list, fuseOptions])

  const results = React.useMemo(() => {
    return fuse.search(searchTerm)
  }, [fuse, searchTerm])

  return results
}
