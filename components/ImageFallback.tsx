import { forwardRef, useState } from 'react'
import Image from 'next/image'

const ImageFallback = forwardRef((props: any, ref) => {
  const { src, fallbackSrc, ...rest } = props
  const [imgSrc, setImgSrc] = useState(false)
  let parsedSrc

  if (!src.includes('http:') || !src.includes('https:')) {
    parsedSrc = `http:${src}`
  } else {
    parsedSrc = src
  }

  const [oldSrc, setOldSrc] = useState(parsedSrc)

  if (oldSrc !== parsedSrc) {
    setImgSrc(false)
    setOldSrc(parsedSrc)
  }
  return (
    <Image
      {...rest}
      src={imgSrc ? fallbackSrc : parsedSrc}
      onError={() => {
        setImgSrc(true)
      }}
      width="235"
      height="305"
      objectFit="cover"
    />
  )
})

export default ImageFallback
