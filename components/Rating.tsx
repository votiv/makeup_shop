import { FunctionComponent } from 'react'

import { RatingType } from './types'

export const Rating: FunctionComponent<RatingType> = ({ rating, ...rest }) => <p {...rest}>Rating: {
  rating ? rating : 'unrated'
}</p>
