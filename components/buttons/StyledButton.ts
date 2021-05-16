import styled from 'styled-components'

import { bwText } from '../../utils/calcTextColor'
import { CssColorType } from '../types'

export const B = styled.button<CssColorType>`
  padding: 1rem;
  border: none;
  outline: none;
  font-weight: bold;
  min-width: 6rem;
  cursor: pointer;
  background-color: ${({ color }) => color ? color : 'grey'};
  color: ${({ color }) => color ? bwText(color) : 'black'};
`
