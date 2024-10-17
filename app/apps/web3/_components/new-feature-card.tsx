/* eslint-disable @next/next/no-img-element */
import { ComponentProps } from 'react'
import { cn, styles } from '../_utils/styles'

export type NewFeatureCardProps = ComponentProps<'div'> & {
  imgUrl: string
  title: string
  subtitle: string
}

export function NewFeatureCard({ imgUrl, title, subtitle, className, ...restProps }: NewFeatureCardProps) {

  return (
    <div className={cn('flex min-w-[210px] flex-1 flex-col sm:max-w-[250px]', className)} {...restProps}>
      <div
        className={cn(styles.flexCenter, 'h-[70px] w-[70px] rounded-[24px] bg-[#323F5D]')}
      >
        <img src={imgUrl} alt="icon" className="size-1/2 object-contain" />
      </div>
      <h1 className="mt-[26px] text-[24px] font-bold leading-[30.24px] text-white">
        Title {title}
      </h1>
      <p className="mt-[16px] flex-1 text-[18px] font-normal leading-[32.4px] text-[#B0B0B0]">
        {subtitle}
      </p>
    </div>
  )
}