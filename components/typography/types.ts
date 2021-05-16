import { CssColorType } from '../types'

export interface StyledTypographyType extends CssColorType {
  borderColor?: string
  align?: 'center' | 'left' | 'right' | 'justify'
}

export interface TypographyType extends StyledTypographyType {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}
