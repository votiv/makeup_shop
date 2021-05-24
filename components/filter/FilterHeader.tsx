import { FunctionComponent, memo, useCallback, useState } from 'react'

import { Typography } from '../typography'
import { Box } from '../layout'
import { FlexRowSpaceBetween } from '../layout'
import { FilterButton } from './FilterButton'
import { FilterSection } from './FilterSection'
import { SearchType } from './types'
import { MAIN_BLUE_COLOR } from '../../utils/constants/constants'
import styled from 'styled-components'

/**
 * FilterHeader
 */
export const FilterHeader: FunctionComponent<SearchType> = memo(({ doSearch }) => {
  const [isOpen, setOpen] = useState(false)

  const toggleFilters = useCallback(() => setOpen((prevState => !prevState)), [])

  return (
    <FilterHeaderWrapper>
      <Box padding="2rem 0">
        <FilterHeaderInner>
          <Typography variant="h1" align="left" color={MAIN_BLUE_COLOR}>Awesome Makeup Shop</Typography>
          <FilterButton isOpen={isOpen} onClick={toggleFilters} />
        </FilterHeaderInner>
      </Box>
      <FilterSection isOpen={isOpen} doSearch={doSearch} />
    </FilterHeaderWrapper>
  )
})

const FilterHeaderWrapper = styled.div`
  @media (max-width: 992px) {
    padding-left: 3rem; 
    padding-right: 3rem; 
  }
`

const FilterHeaderInner = styled(FlexRowSpaceBetween)`
  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`
