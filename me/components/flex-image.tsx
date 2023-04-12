'use client'
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type AdvancedImageProps = React.ComponentProps<typeof AdvancedImage>

export type FlexImageProps = {
  cloudName?: string
  cldImg?: AdvancedImageProps['cldImg']
  cloudinaryImgPubId?: string
} & Omit<AdvancedImageProps, 'cldImg'> & ComponentPropsWithoutRef<'img'>


export function FlexImage(props: FlexImageProps) {
  const { className, cloudName, cloudinaryImgPubId, cldImg, ...restProps } = props

  // https://cloudinary.com/documentation/react_integration#full_example
  const image = new Cloudinary({
    cloud: {
      cloudName: cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    }
  }).image(cloudinaryImgPubId)
    .format('auto')

  return (
    <AdvancedImage
      className={twMerge(
        'flex w-full justify-center rounded object-contain',
        className,
      )}
      plugins={[
        lazyload(),
        responsive({ steps: [800, 1000, 1400] }),
        placeholder({ mode: 'predominant' }),
      ]}
      {...restProps}
      cldImg={cldImg || image}
    />
  )
}
