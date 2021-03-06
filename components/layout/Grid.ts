import styled from 'styled-components'

import { GridType } from './types'

export const Grid = styled.div<GridType>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minMax || '2.5rem'}, 1fr));
  width: ${props => props.width || '100%'};
  grid-gap: ${props => props.gridGap || '.5rem'};
  
  @media (max-width: 992px) {
    padding: 0 3rem;
  }
`
