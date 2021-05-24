import { FunctionComponent } from 'react'

import { RatingType } from './types'

/**
 * Rating
 * @param rating
 * @param rest
 */
export const Rating: FunctionComponent<RatingType> = ({ rating, ...rest }) => <p {...rest}>Rating: {
  rating ? rating : 'unrated'
}</p>
