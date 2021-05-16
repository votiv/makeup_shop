import styled from 'styled-components'

import { CssColorType } from '../types'

export const ImageWrapper = styled.div<CssColorType>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  padding: 7rem;
  background-color: ${({ color }) => color};
  box-shadow: rgb(38, 57, 77) 0 20px 30px -10px;

  @media (max-width: 992px) {
    width: 80%;
    margin: 0 auto 4rem;
    padding: 4rem;
  }
`
