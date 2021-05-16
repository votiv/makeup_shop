import { CssColorType } from '../types'

export interface StyledAnchorButtonType extends CssColorType {
  bwButton?: boolean
}

export interface AnchorButtonType extends StyledAnchorButtonType {
  url: string
}
