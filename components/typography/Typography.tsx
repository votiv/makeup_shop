import styled from 'styled-components'
import { FunctionComponent } from 'react'

interface StyledTypographyType {
  borderColor?: string
  align: 'center' | 'left' | 'right' | 'justify'
}

interface TypographyType extends StyledTypographyType {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

const T = styled.div<StyledTypographyType>`
  border-bottom: ${({ borderColor }) => borderColor ? `3px solid ${borderColor}` : 'none'};
  width: 100%;
  text-align: ${({ align }) => align};
`

export const Typography: FunctionComponent<TypographyType> = props => {
  const { variant, borderColor, align = 'left', children, ...rest } = props

  return (
    <T
      as={variant}
      borderColor={borderColor}
      align={align}
      {...rest}
    >
      {children}
    </T>
  )
}
