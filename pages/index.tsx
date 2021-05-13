import useSWR, { useSWRInfinite } from 'swr'

import { fetcher } from '../utils/fetcher'

const PAGE_SIZE = 20

const getKey = (pageIndex, previousPageData) =>
  (previousPageData && !previousPageData.length)
    ? null
    : `/api/products?perPage=${PAGE_SIZE}&page=${pageIndex}`

const Index = props => {
  const { data, error, size, setSize, mutate } = useSWRInfinite(getKey, fetcher)
  const products = data ? [].concat(...data) : []

  if (!products) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      {
        products && products.map((p, i) => <div key={p.id || i}>{p.name}</div>)
      }
    </div>
  )
}

export default Index
