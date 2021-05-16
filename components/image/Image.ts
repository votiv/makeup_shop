import styled from 'styled-components'

export const Image = styled.img`
  width: auto;
  max-width: 40vw;
  height: 50vh;
  object-fit: contain;

  @media (max-width: 992px) {
    height: 33vh;
  }
`
