import useSWR from 'swr'

import { fetcher } from '../utils/fetcher'

const Index = props => {
  const { data, error } = useSWR('/api/products', fetcher)

  if (!data) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      {
        data && data.map(d => <div key={d.id}>{d.name}</div>)
      }
    </div>
  )
}

export default Index
