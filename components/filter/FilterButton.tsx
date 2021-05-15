import styled from 'styled-components'
import { FunctionComponent } from 'react'

import { Box, FlexRowSpaceBetween } from '../layout'
import { FilterIcon } from '../icons'
import { MAIN_BLUE_COLOR } from '../../utils/constants/constants'

export interface FBType {
  isOpen: boolean
}

interface FilterButtonType extends FBType {
  onClick: () => void
}

export const FilterButton: FunctionComponent<FilterButtonType> = ({ isOpen, onClick, ...rest }) => (
  <Box padding=".25rem 1rem">
    <FB {...rest} isOpen={isOpen} onClick={onClick}>
      <FlexRowSpaceBetween width="5rem">
        <FilterIcon isOpen={isOpen} />
        Filter
      </FlexRowSpaceBetween>
    </FB>
  </Box>
)

const FB = styled.button<FBType>`
  border: 1px solid ${({ isOpen }) => isOpen ? 'gray' : MAIN_BLUE_COLOR};
  border-radius: .25rem;
  color: ${({ isOpen }) => isOpen ? 'gray' : MAIN_BLUE_COLOR};
  outline: none;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  transition: border-color .5s ease, color .5s ease;

  svg {
    transition: fill .5s ease;
  }
`
