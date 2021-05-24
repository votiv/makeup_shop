import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { bwText } from '../../utils/calcTextColor'
import { B } from './StyledButton'
import { AnchorButtonType, StyledAnchorButtonType } from './types'

const A = styled(B)<StyledAnchorButtonType>`
  && {
    background-color: ${({ bwButton, color }) => bwButton ? 'grey' : color};
    color: ${({ bwButton, color }) => bwButton ? 'black' : bwText(color)};

    @media (max-width: 768px) {
      margin-right: 2rem;
    }
  }
`

/**
 * Styles anchors like buttons
 * @param url
 * @param children
 * @param rest
 */
export const AnchorButton: FunctionComponent<AnchorButtonType> = ({ url, children, ...rest }) => {
  const reg = new RegExp('^(http|https)://')

  return reg.test(url)
    ? <a href={url} target="_blank"><A {...rest}>{children}</A></a>
    : <Link href={url}><A {...rest}>{children}</A></Link>
}
