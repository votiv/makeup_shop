import styled from 'styled-components'

interface BoxType {
  width?: string
  height?: string
  padding?: string
  margin?: string
  boxShadow?: string
}

export const Box = styled.div<BoxType>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  box-shadow: ${props => props.boxShadow || 'none'};
`
