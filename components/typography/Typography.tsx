import styled from 'styled-components'
import { FunctionComponent } from 'react'

import { StyledTypographyType, TypographyType } from './types'

const T = styled.div<StyledTypographyType>`
  border-bottom: ${({ borderColor }) => borderColor ? `3px solid ${borderColor}` : 'none'};
  width: 100%;
  text-align: ${({ align }) => align};
  color: ${({ color }) => color};
`

/**
 * Typography
 * @param props
 * @constructor
 */
export const Typography: FunctionComponent<TypographyType> = props => {
  const { variant, borderColor, align = 'left', color, children, ...rest } = props

  return (
    <T
      as={variant}
      borderColor={borderColor}
      align={align}
      color={color}
      {...rest}
    >
      {children}
    </T>
  )
}
