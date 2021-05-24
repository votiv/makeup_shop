import { Children, cloneElement, FunctionComponent, ReactElement } from 'react'

import { BoxType } from './types'

/**
 * Box layout component. Propagates layout styles to children
 * @param children
 * @param rest
 */
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
