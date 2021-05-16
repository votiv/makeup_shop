import { FunctionComponent } from 'react'
import styled from 'styled-components'
import debounce from 'lodash.debounce'

import { Box, FlexColumn, FlexRow } from '../layout'
import { FBType, SearchActionKind, SearchType } from './types'
import { MAIN_BLUE_COLOR } from '../../utils/constants/constants'

export const FilterSection: FunctionComponent<SearchType & FBType> = ({ isOpen, doSearch }) => {
  const onInputChange = debounce(
    event => doSearch({ type: SearchActionKind.Search, payload: event.target.value }),
    300
  )

  const onKeyUp = debounce(
    event => {
      if (event.keyCode === 'Enter') {
        doSearch({ type: SearchActionKind.Search, payload: event.target.value })
      }
    },
    300
  )

  return (
    <FS isOpen={isOpen}>
      <FilterWrapper isOpen={isOpen}>
        <FlexColumn>
          <label htmlFor="search">Search</label>
          <Box height="2rem" padding=".5rem">
            <Input
              name="search"
              onChange={onInputChange}
              onKeyUp={onKeyUp}
              placeholder="Enter search value"
              autoComplete="off"
            />
          </Box>
        </FlexColumn>
      </FilterWrapper>
    </FS>
  )
}

const FS = styled.div<FBType>`
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  height: ${({ isOpen }) => isOpen ? '6rem' : '0'};
  width: 100%;
  margin-bottom: ${({ isOpen }) => isOpen ? '2.5rem' : '0'};
  transition: height .5s ease, margin-bottom .5s ease, opacity .6s ease;
`

const FilterWrapper = styled(FlexRow)<FBType>`
  align-items: center;
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  transition: opacity .25s ease;
  padding: 2rem;
`

const Input = styled.input`
  width: 14rem;
  border-radius: .25rem;
  border: none;
  outline: none;
  background-color: #e3e3e3;
  box-shadow: none;
  transition: box-shadow .5s ease, background-color .5s ease;

  &:hover {
    background-color: #fff;
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 4px rgba(66, 102, 150, .1);
    transition: box-shadow .5s ease, background-color .5s ease;
  }

  &:focus {
    border: 1px solid ${MAIN_BLUE_COLOR};
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(66, 102, 150, .1);
  }
`
