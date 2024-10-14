import React from 'react'
import type { SvgIconProps } from 'shared-types'
export default function PlasmoIcon({
  width = 34,
  height = 44,
  title,
  className,
  ...restProps
}: SvgIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 34 44" className={className}>
      <title>{title}</title>
      <path d="M16.8667 35.0812C19.2967 35.0812 21.3513 37.1684 20.1782 39.2965C20.0389 39.5493 19.8866 39.7962 19.7218 40.0362C18.7146 41.503 17.2829 42.6461 15.6079 43.3212C13.933 43.9962 12.0898 44.1728 10.3117 43.8287C8.53353 43.4846 6.90019 42.6351 5.6182 41.3878C4.33622 40.1405 3.46318 38.5513 3.10948 36.8211C2.75579 35.091 2.93732 33.2977 3.63112 31.668C4.32492 30.0383 5.49984 28.6454 7.00729 27.6653C7.2829 27.4862 7.56736 27.3223 7.8593 27.174C10.0261 26.0739 12.1 28.1322 12.1 30.5622V30.6812C12.1 33.1112 14.07 35.0812 16.5 35.0812H16.8667Z"></path><path d="M24.5666 18.6702C24.5666 16.2401 26.6405 14.1819 28.8073 15.282C29.0992 15.4302 29.3837 15.5941 29.6593 15.7733C31.1667 16.7533 32.3417 18.1463 33.0355 19.776C33.7293 21.4057 33.9108 23.199 33.5571 24.9291C33.2034 26.6592 32.3304 28.2484 31.0484 29.4957C29.7664 30.7431 28.1331 31.5925 26.3549 31.9367C24.5767 32.2808 22.7336 32.1042 21.0586 31.4291C19.3836 30.7541 17.952 29.6109 16.9448 28.1442C16.7799 27.9042 16.6277 27.6573 16.4883 27.4045C15.3153 25.2763 17.3698 23.1891 19.7999 23.1891L20.1666 23.1891C22.5966 23.1891 24.5666 21.2192 24.5666 18.7891L24.5666 18.6702Z"></path><path d="M12.2224 19.3838C12.2224 21.8138 10.1936 23.8563 7.91208 23.0198C7.04393 22.7014 6.21144 22.2863 5.43205 21.7796C3.42212 20.4729 1.85557 18.6157 0.930494 16.4427C0.00542386 14.2698 -0.236617 11.8787 0.234979 9.5719C0.706577 7.2651 1.87063 5.14617 3.57994 3.48305C5.28925 1.81994 7.46704 0.68735 9.83792 0.228499C12.2088 -0.230353 14.6663 0.00514682 16.8996 0.905216C19.1329 1.80529 21.0418 3.3295 22.3848 5.28511C22.8846 6.01303 23.2978 6.78854 23.6195 7.59666C24.5183 9.85439 22.4746 11.8919 20.0446 11.8919L16.6224 11.8919C14.1923 11.8919 12.2224 13.8618 12.2224 16.2919L12.2224 19.3838Z"></path>
    </svg>
  )
}
