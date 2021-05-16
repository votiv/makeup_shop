export type ObjectFit = 'cover' | 'contain' | 'none'

export interface ImageFallbackType {
  src?: string
  alt?: string
  fallbackSrc?: string
  width?: string
  height?: string
  objectFit?: ObjectFit
}

export interface RatingType {
  rating: string | null
}

export interface CssColorType {
  color?: string
}
