import {Cloudinary} from '@cloudinary/url-gen'
import {AdvancedImage, lazyload, responsive} from '@cloudinary/react'
import {crop, fill, pad} from '@cloudinary/url-gen/actions/resize' // keep for reference as official docs didn't documented
import {twMerge} from 'tailwind-merge'

export function FlexImage(props) {
  const {className, cloudName, cloudinaryImgPubId, ...restProps} = props
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  })
  const image = cld
    .image(cloudinaryImgPubId)
    // .resize(crop().aspectRatio(2))
    .format('auto')

  return (
    <AdvancedImage
      className={twMerge(
        'flex w-full justify-center rounded object-contain',
        className,
      )}
      cldImg={image}
      plugins={[responsive(), lazyload()]}
      {...restProps}
    />
  )
}
