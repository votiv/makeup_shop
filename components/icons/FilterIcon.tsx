import { FunctionComponent } from 'react'

import { MAIN_BLUE_COLOR } from '../../utils/constants/constants'
import { FBType } from '../filter/types'

/**
 * FilterIcon
 * @param isOpen
 */
export const FilterIcon: FunctionComponent<FBType> = ({ isOpen }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
       fill={isOpen ? 'grey' : MAIN_BLUE_COLOR}
       opacity=".8">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
)
