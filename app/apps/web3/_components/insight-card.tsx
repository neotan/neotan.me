/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import { ComponentProps } from 'react'
import { fadeIn } from '../_utils/motions'
import { cn } from '../_utils/styles'

export type InsightCardProps = ComponentProps<typeof motion.div> & {
  imgUrl: string,
  index: number,
  subtitle: string,
}

export function InsightCard({ className, imgUrl, title, subtitle, index }: InsightCardProps) {

  return (
    <motion.div
      className={cn('flex flex-col gap-4 md:flex-row', className)}
      variants={fadeIn('up', 'spring', index * 0.5, 1)}
    >
      <img
        className="h-[250px] w-full rounded-[32px] object-cover md:w-[270px]"
        src={imgUrl}
        alt="planet-01"
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex max-w-[650px] flex-1 flex-col md:ml-[62px]">
          <h4 className="text-[26px] font-normal text-white lg:text-[42px]">
            {title}
          </h4>
          <p className="text-secondary-white mt-[16px] text-[14px] font-normal lg:text-[20px]">
            {subtitle}
          </p>
        </div>

        <div
          className="hidden size-[100px] cursor-pointer items-center justify-center rounded-full border border-white bg-transparent lg:flex"
        >
          <img
            className="size-2/5 object-contain"
            src="/web3-images/arrow.svg"
            alt="Arrow"
          />
        </div>
      </div>
    </motion.div>
  )
}