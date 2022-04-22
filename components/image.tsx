import {Cloudinary} from '@cloudinary/url-gen'
import {AdvancedImage, lazyload, responsive} from '@cloudinary/react'

export function FlexImage(props) {
  const {cloudName, cloudinaryImgPubId} = props
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  })

  const image = cld.image(cloudinaryImgPubId).format('auto')

  return (
    <AdvancedImage
      cldImg={image}
      plugins={[responsive(), lazyload()]}
      {...props}
    />
  )
}
