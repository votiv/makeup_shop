import styled from 'styled-components'

import { bwText } from '../../utils/calcTextColor'

export interface StyledButtonType {
  color?: string
}

export const B = styled.button<StyledButtonType>`
  padding: 1rem;
  border: none;
  outline: none;
  font-weight: bold;
  min-width: 6rem;
  cursor: pointer;
  background-color: ${({ color }) => color ? color : 'gray'};
  color: ${({ color }) => color ? bwText(color) : 'black'};
`
