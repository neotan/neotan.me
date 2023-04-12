import { ComponentProps } from 'react'

export * from './src/algolia'

export type DynamicRoutePageProps<T, U = URLSearchParams> =
  { params: T, searchParams?: URLSearchParams }


export type SvgIconProps = ComponentProps<'svg'> & { title?: string }