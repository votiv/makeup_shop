import styled from 'styled-components'

import { FlexRowCentered } from '../layout'

interface CardDetailsType {
  color?: string
}

export const CardDetails = styled(FlexRowCentered)<CardDetailsType>`
  width: 100%;
  justify-content: space-between;
  text-align: center;
  color: ${({ color }) => color};
  padding-top: 1.5rem;
  white-space: nowrap;
  
  h3 {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`
