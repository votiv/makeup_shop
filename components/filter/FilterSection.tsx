import { FunctionComponent, useCallback, useRef } from 'react'
import styled from 'styled-components'
import debounce from 'lodash.debounce'

import { Box, FlexColumn, FlexRow } from '../layout'
import { FBType, SearchActionKind, SearchType } from './types'
import { MAIN_BLUE_COLOR } from '../../utils/constants/constants'
import { Button } from '../buttons'

/**
 * Filter Section for the header
 * @param isOpen
 * @param doSearch
 */
export const FilterSection: FunctionComponent<SearchType & FBType> = ({ isOpen, doSearch }) => {
  const input = useRef(null)

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

  const clearFilter = useCallback(() => {
    doSearch({ type: SearchActionKind.Search, payload: '' })
    if (input.current) {
      input.current.value = ''
    }
  }, [])

  return (
    <FS isOpen={isOpen}>
      <FilterWrapper isOpen={isOpen}>
        <FlexColumn>
          <Label htmlFor="search">Search</Label>
          <Box height="2rem" padding=".5rem">
            <Input
              ref={input}
              name="search"
              onChange={onInputChange}
              onKeyUp={onKeyUp}
              placeholder="Enter search value"
              autoComplete="off"
            />
          </Box>
        </FlexColumn>
        <ClearButton
          onClick={clearFilter}
          color={MAIN_BLUE_COLOR}
        >
          Clear filters
        </ClearButton>
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
  padding: 0 2rem 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 0 3rem 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }
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

const ClearButton = styled(Button)`
  height: 2rem;
  margin-left: 4rem;
  margin-top: 1.5rem;
  padding: .5rem;
  border-radius: .25rem;

  @media (max-width: 600px) {
    padding: 0;
    margin: 1rem 0 0;
  }
`

const Label = styled.label`
  @media (max-width: 600px) {
    text-align: center;
  }
`
