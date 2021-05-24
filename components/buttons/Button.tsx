import { B } from './StyledButton'

/**
 * Button
 * @param children
 * @param rest
 */
export const Button = ({ children, ...rest }) => <B {...rest}>{children}</B>
