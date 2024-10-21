import { BaseItem } from '@algolia/autocomplete-core'
import { autocomplete, AutocompleteOptions } from '@algolia/autocomplete-js'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import React from 'react'
import {
  createElement,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
// eslint-disable-next-line react/no-deprecated
import { render } from 'react-dom'

import { usePagination, useSearchBox } from 'react-instantsearch'

import '@algolia/autocomplete-theme-classic'

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string
}

type SetInstantSearchUiStateOptions = {
  query: string
}

export function Autocomplete({
  className,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null)

  const { query, refine: setQuery } = useSearchBox()
  const { refine: setPage } = usePagination()

  const [instantSearchUiState, setInstantSearchUiState] =
    useState<SetInstantSearchUiStateOptions>({ query })

  useEffect(() => {
    setQuery(instantSearchUiState.query)
    setPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instantSearchUiState])

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: 'instantsearch',
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({ query: item.label })
          },
        }
      },
    })

    return [recentSearches]
  }, [])

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query },
      onReset() {
        setInstantSearchUiState({ query: '' })
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query })
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query,
          })
        }
      },
      plugins,
      renderer: {
        createElement,
        Fragment,
        // @ts-ignore
        render,
      },
    })

    return () => autocompleteInstance.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plugins])

  return <div className={className} ref={autocompleteContainer} />
}
