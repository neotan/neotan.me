/* eslint-disable @next/next/no-img-element */ // 'next/image' requires static size of image
'use client';
import { ComponentProps, Dispatch, MouseEventHandler, SetStateAction } from "react";
import { motion } from 'framer-motion';
import { cn, styles } from '../utils/styles'
import { WorldId } from '../utils/constants'
import { fadeIn } from '../utils/motions'



export type ExploreCardProps = ComponentProps<typeof motion.div> & {
  id: WorldId,
  imgUrl: string,
  index: number,
  activeId: string,
}

export function ExploreCard({
  id,
  imgUrl,
  title,
  index,
  activeId,
  className,
  onClick
}: ExploreCardProps) {
  return (
    <motion.div
      className={cn('relative ease-out-flex flex h-[700px] min-w-[170px] cursor-pointer items-center justify-center transition-[flex] duration-[0.7s]', activeId === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]', className)}
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      onClick={onClick}
    >
      <img
        className="absolute h-full w-full rounded-[24px] object-cover"
        src={imgUrl}
        alt="/images/planet-04"
      />
      {
        activeId !== id ? (
          <h3 className="absolute z-0 text-[18px] font-semibold text-white sm:text-[26px] lg:bottom-20 lg:origin-[0,0] lg:rotate-[-90deg]">
            {title}
          </h3>
        ) : (
          <div className="absolute bottom-0 flex w-full flex-col justify-start rounded-b-[24px] bg-black/50 p-8">
            <div
              className={cn('glassmorphism mb-[16px] h-[60px] w-[60px] rounded-[24px]', styles.flexCenter)}
            >
              <img
                className="h-1/2 w-1/2 object-contain"
                src="/images/headset.svg"
                alt="headset"
              />
            </div>
            <p className="text-[16px] font-normal uppercase leading-[20.16px] text-white">
              Enter Metaverse
            </p>
            <h2 className="mt-[24px] text-[24px] font-semibold text-white sm:text-[32px]">
              {title}
            </h2>
          </div>
        )
      }
    </motion.div >
  )
}