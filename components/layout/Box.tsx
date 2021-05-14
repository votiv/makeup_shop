import { Children, cloneElement, FunctionComponent, ReactElement } from 'react'

interface BoxType {
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

export const Box: FunctionComponent<BoxType> = ({ children, ...rest }) => {
  return cloneElement(
    (Children.only(children) as ReactElement),
    {
      style: {
        ...rest
      }
    }
  )
}
