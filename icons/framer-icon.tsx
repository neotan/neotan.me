import React from 'react'
import type { SvgIconProps } from 'shared-types'
export default function FramerMotionIcon({
  width,
  height,
  title,
  ...restProps
}: SvgIconProps) {
  return (
    <svg stroke='currentColor' fill='currentColor' viewBox='0 0 12 18' width={width} height={height} {...restProps}>
      <title>{title}</title>
      <path d="M 12 0 L 12 6 L 6 6 L 0 0 Z M 0 6 L 6 6 L 12 12 L 6 12 L 6 18 L 0 12 Z" />
    </svg>

  )
}
