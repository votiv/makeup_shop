export interface BoxType {
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  minWidth?: string
  minHeight?: string
  padding?: string
  margin?: string
  boxShadow?: string
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
}

export interface FlexRowType extends Pick<BoxType, 'width'> {}

export interface GridType extends Pick<BoxType, 'width'> {
  minMax?: string
  gridGap?: string
}
