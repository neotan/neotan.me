import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const styles = {
  innerWidth: 'w-full 2xl:max-w-[1280px]',
  interWidth: 'w-[100%] lg:w-[80%]',

  p: 'px-6 py-12 xs:p-8 sm:p-16',
  py: 'py-12 xs:py-8 sm:py-16',
  px: 'px-6 sm:px-16',
  pt: 'pt-12 xs:pt-8 sm:pt-16',
  pb: 'pb-12 xs:pb-8 sm:pb-16',

  flexCenter: 'flex items-center justify-center',
  flexStart: 'flex items-start justify-start',
  flexEnd: 'flex justify-end',
  navPadding: 'pt-[98px]',

  heroHeading: 'text-[44px] font-bold uppercase leading-[64.4px] text-white sm:text-[60px] sm:leading-[74.4px] md:text-[100px] md:leading-[114.4px] lg:text-[144px] lg:leading-[158.4px]',
  heroDText: 'mx-[6px] h-[38px] w-[60px] rounded-r-[50px] border-[9px] border-white sm:mx-2 sm:h-[48px] sm:w-[80px] md:h-[108px] md:w-[212px] md:border-[18px]',

}

export function cn(...classNames: Parameters<typeof clsx>) {
  return twMerge(clsx(classNames))
}