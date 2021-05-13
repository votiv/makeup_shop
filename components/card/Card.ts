import styled from 'styled-components'

import { FlexColumnCentered } from '../layout'

interface CardType {
  backgroundColor?: string
}

export const Card = styled(FlexColumnCentered)<CardType>`
  background-color: ${({ backgroundColor }) => (backgroundColor || 'white')};
  border-radius: .5rem;
  padding: 1.5rem 1.5rem .5rem;
  cursor: pointer;
`
