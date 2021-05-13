import { useSWRInfinite } from 'swr'
import Link from 'next/link'

import { fetcher } from '../utils/fetcher'
import { bwText } from '../utils/calcTextColor'
import { Container, Box, Grid } from '../components/layout'
import ImageFallback from '../components/ImageFallback'
import { Shimmer } from '../components/Shimmer'
import { CardDetails, Card } from '../components/card'
import { getRandomItem } from '../utils/arrayUtils'

const PAGE_SIZE = 20

const getKey = (pageIndex, previousPageData) =>
  (previousPageData && !previousPageData.length)
    ? null
    : `/api/products?perPage=${PAGE_SIZE}&page=${pageIndex}`

const Index = props => {
  const { data, error, size, setSize, mutate } = useSWRInfinite(getKey, fetcher)
  const products = data ? [].concat(...data) : []

  console.log('products', products)

  if (!products) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Container>
      <Box width="100%" height="80vh">
        <Grid minMax="17rem">
          {
            products.length > 0 && products.map((product, index) => {
              const bColor = getRandomItem(product.product_colors.map(c => c.hex_value))

              return (
                <Link href="/product/[id]" as={`/product/${product.id}`} key={product.id || index}>
                  <Card backgroundColor={bColor}>
                    <ImageFallback
                      src={product.api_featured_image}
                      fallbackSrc={Shimmer}
                      alt={product.name}
                    />
                    <CardDetails color={bwText(bColor)}>
                      <h3>{product.name}</h3>
                      <p>Price: {`${product.price_sign} ${product.price}`}</p>
                    </CardDetails>
                  </Card>
                </Link>
              )

            })
          }
        </Grid>
      </Box>
    </Container>
  )
}

export default Index
