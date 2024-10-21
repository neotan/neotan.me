import React from 'react'
import type { SvgIconProps } from 'shared-types'
export default function OpenbaseIcon({
  size,
  width = 30,
  height = 30,
  title,
  ...props
}: SvgIconProps) {
  return (
    <svg
      width={width || size}
      height={height || size}
      viewBox="160 210 780 750"
      {...props}
    >
      <title>{title}</title>
      <g>
        <path
          d="M196.86 699.945l.574-394.902 350.538-94.487 352.256 93.524-.572 394.9L547.933 963.36z"
          fillOpacity="0"
        />
        <path d="M547.934 963.358L196.863 699.944l-32.221-365.768L547.97 210.555l386.895 123.621-35.21 364.807-351.721 264.375zm.207-712.027l-341.1 110.752 340.912 601.139L892.72 362.163l-344.579-110.83z" />
      </g>
    </svg>
  )
}
