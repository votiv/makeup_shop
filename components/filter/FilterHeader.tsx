import { Dispatch, FunctionComponent, memo, useCallback, useState } from 'react'

import { Typography } from '../typography'
import { Box } from '../layout'
import { FlexRowSpaceBetween } from '../layout'
import { FilterButton } from './FilterButton'
import { FilterSection } from './FilterSection'
import { SearchActionType } from './interface'
import { MAIN_BLUE_COLOR } from '../../utils/constants/constants'

export interface SearchType {
  doSearch: Dispatch<SearchActionType>
}

export const FilterHeader: FunctionComponent<SearchType> = memo(({ doSearch }) => {
  const [isOpen, setOpen] = useState(false)

  const toggleFilters = useCallback(() => setOpen((prevState => !prevState)), [])

  return (
    <>
      <Box padding="2rem 0">
        <FlexRowSpaceBetween>
          <Typography variant="h1" align="left" color={MAIN_BLUE_COLOR}>Awesome Makeup Shop</Typography>
          <FilterButton isOpen={isOpen} onClick={toggleFilters} />
        </FlexRowSpaceBetween>
      </Box>
      <FilterSection isOpen={isOpen} doSearch={doSearch} />
    </>
  )
})
