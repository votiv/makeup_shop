import styled from 'styled-components'

export const Image = styled.img`
  width: auto;
  height: 50vh;
  object-fit: contain;

  @media (max-width: 992px) {
    height: 33vh;
  }
`
