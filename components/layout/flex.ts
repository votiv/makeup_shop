import styled from 'styled-components'

import { FlexRowType } from './types'

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const FlexColumnCentered = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
`

export const FlexRow = styled.div<FlexRowType>`
  display: flex;
  flex-direction: row;
  ${({ width }) => width ? `width: ${width};` : ''}
`

export const FlexRowCentered = styled(FlexRow)`
  align-items: center;
  justify-content: center;
`

export const FlexRowSpaceBetween = styled(FlexRow)`
  align-items: center;
  justify-content: space-between;
`

export const FlexRowStart = styled(FlexRow)`
  align-items: flex-start;
`
