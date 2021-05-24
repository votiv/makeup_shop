import styled from 'styled-components'
import { FunctionComponent } from 'react'

import { Box, FlexRowSpaceBetween } from '../layout'
import { FilterIcon } from '../icons'
import { MAIN_BLUE_COLOR } from '../../utils/constants/constants'
import { FBType, FilterButtonType } from './types'
import { Typography } from '../typography'

/**
 * Special Button for the search section
 * @param isOpen
 * @param onClick
 * @param rest
 */
export const FilterButton: FunctionComponent<FilterButtonType> = ({ isOpen, onClick, ...rest }) => (
  <Box padding=".25rem 1rem">
    <FB {...rest} isOpen={isOpen} onClick={onClick}>
      <FilterInner width="5rem">
        <FilterIcon isOpen={isOpen} />
        <HidingFilter variant="p" align="center">Filter</HidingFilter>
      </FilterInner>
    </FB>
  </Box>
)

const FB = styled.button<FBType>`
  border: 1px solid ${({ isOpen }) => isOpen ? 'grey' : MAIN_BLUE_COLOR};
  border-radius: .25rem;
  color: ${({ isOpen }) => isOpen ? 'grey' : MAIN_BLUE_COLOR};
  outline: none;
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  transition: border-color .5s ease, color .5s ease;

  svg {
    transition: fill .5s ease;
  }

  @media (max-width: 600px) {
    padding: .25rem !important;
    margin-top: 1rem;
  }
`

const HidingFilter = styled(Typography)`
  @media (max-width: 600px) {
    display: none;
  }
`

const FilterInner = styled(FlexRowSpaceBetween)`
  @media (max-width: 600px) {
    width: auto;
  }
`
