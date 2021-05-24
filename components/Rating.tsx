import { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'

import { RatingType } from './types'

/**
 * Rating
 * @param rating
 * @param rest
 */
export const Rating: FunctionComponent<RatingType> = ({ rating, ...rest }) => {
  const intl = useIntl()

  return (
    <p {...rest}>
      {intl.formatMessage({ id: 'label.rating' })}: {rating ? rating : intl.formatMessage({id: 'label.unrated' })}
    </p>
  )
}
