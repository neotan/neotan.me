import React from 'react'
import type { SvgIconProps } from 'shared-types'
export default function UnpkgIcon({
  size,
  width = 20,
  height = 20,
  title,
  ...props
}: SvgIconProps) {
  return (
    <svg
      width={width || size}
      height={height || size}
      viewBox="0 0 256 256"
      {...props}
    >
      <title>{title}</title>
      <g transform="translate(0,262) scale(0.1,-0.1)" stroke="none">
        <path
          d="M0 1768 c0 -683 3 -870 14 -938 49 -297 149 -487 330 -625 192 -146
415 -205 771 -205 337 0 547 51 740 181 115 77 197 173 265 314 45 94 47 99
69 185 46 182 46 190 46 1085 l0 850 -337 3 -338 2 0 -817 c0 -866 -1 -885
-48 -1003 -62 -153 -172 -213 -392 -213 -172 0 -249 24 -328 102 -48 47 -77
105 -99 197 -15 61 -17 165 -20 902 l-4 832 -334 0 -335 0 0 -852z"
        />
      </g>
    </svg>
  )
}
