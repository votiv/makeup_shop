import { useState } from 'react'
import Image from 'next/image'

import { ImageFallbackType } from './types'

/**
 * ImageFallback, for lazy loading images
 * @param props
 */
const ImageFallback = (props: ImageFallbackType) => {
  const { src, fallbackSrc, width, height, objectFit, ...rest } = props
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
      width={width ? (parseInt(width) * 16).toString() : '235'}
      height={height ? (parseInt(height) * 16).toString() : '305'}
      objectFit={objectFit}
    />
  )
}

export default ImageFallback
