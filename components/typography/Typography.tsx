import styled from 'styled-components'
import { FunctionComponent } from 'react'

interface StyledTypographyType {
  borderColor?: string
  align?: 'center' | 'left' | 'right' | 'justify'
  color?: string
}

interface TypographyType extends StyledTypographyType {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

const T = styled.div<StyledTypographyType>`
  border-bottom: ${({ borderColor }) => borderColor ? `3px solid ${borderColor}` : 'none'};
  width: 100%;
  text-align: ${({ align }) => align};
  color: ${({ color }) => color};
`

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
