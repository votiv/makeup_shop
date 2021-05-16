import { Children, cloneElement, FunctionComponent, ReactElement } from 'react'

import { BoxType } from './types'

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
