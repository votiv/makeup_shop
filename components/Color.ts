import styled from 'styled-components'

const ColorTooltip = styled.p`
  visibility: hidden;
  position: absolute;
  display: flex;
  background-color: lightgray;
  left: 1rem;
  z-index: 2;
  top: 0.5rem;
  box-shadow: .25rem .25rem .5rem rgba(0, 0, 0, .15);
  width: 8rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
`

export const Color = styled.div`
  position: relative;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.color};

  &:hover {
    ${ColorTooltip} {
      visibility: visible;
    }
  }
`
