import { useState } from 'react'
import Image from 'next/image'

type ObjectFit = 'cover' | 'contain' | 'none'

interface ImageFallbackType {
  src?: string
  alt?: string
  fallbackSrc?: string
  width?: string
  height?: string
  objectFit?: ObjectFit
}

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
