import { FunctionComponent } from 'react'

interface RatingType {
  rating: string | null
}

export const Rating: FunctionComponent<RatingType> = ({ rating, ...rest }) => <p {...rest}>Rating: {
  rating ? rating : 'unrated'
}</p>
