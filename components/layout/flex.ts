import styled from 'styled-components'

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const FlexColumnCentered = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexRowCentered = styled(FlexRow)`
  align-items: center;
  justify-content: center;
`
