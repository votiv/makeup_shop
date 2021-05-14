import { useSWRInfinite } from 'swr'
import Link from 'next/link'

import { fetcher } from '../utils/fetcher'
import { bwText } from '../utils/calcTextColor'
import { Box, Container, Grid, FlexRowCentered, AbsoluteCentered } from '../components/layout'
import ImageFallback from '../components/ImageFallback'
import { Fallback } from '../components/Fallback'
import { Card, CardDetails } from '../components/card'
import { getRandomItem } from '../utils/arrayUtils'
import { DEFAULT_COLOR, PAGE_SIZE } from '../utils/constants/constants'
import { Button } from '../components/buttons'
import Spinner from '../components/Spinner'
import { Typography } from '../components/typography'

const getKey = (pageIndex, previousPageData) =>
  (previousPageData && !previousPageData.length)
    ? null
    : `/api/products?perPage=${PAGE_SIZE}&page=${pageIndex}`


const Index = () => {
  const { data, error, size, setSize, mutate, isValidating } = useSWRInfinite(getKey, fetcher)
  const products = data ? [].concat(...data) : []

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  if (!products) {
    return <AbsoluteCentered><Spinner color="#426696" /></AbsoluteCentered>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Container as="main">
      <Box width="100%" height="80vh">
        <>
          <Grid minMax="17rem" as="section">
            {
              products.length > 0 && products.map((product, index) => {
                const bColor = getRandomItem<string>(product.product_colors.map(c => c.hex_value))

                return (
                  <Link
                    href="/product/[id]"
                    as={`/product/${product.id}`}
                    key={product.id || index}
                  >
                    <Card backgroundColor={bColor || DEFAULT_COLOR}>
                      <ImageFallback
                        src={product.api_featured_image}
                        fallbackSrc={Fallback}
                        alt={product.name}
                        objectFit="cover"
                      />
                      <CardDetails color={bwText(bColor || DEFAULT_COLOR)}>
                        <h3>{product.name}</h3>
                        <p>Price: {`${product.price_sign} ${product.price}`}</p>
                      </CardDetails>
                    </Card>
                  </Link>
                )
              })
            }
          </Grid>

          <Box margin="2rem 0">
            <FlexRowCentered>
              {isLoadingMore
                ? <Spinner color="#426696" />
                : isReachingEnd
                  ? <Typography variant="p" align="center">No more products</Typography>
                  : <Button
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                  >
                    load more
                  </Button>}
            </FlexRowCentered>
          </Box>

        </>
      </Box>
    </Container>
  )
}

export default Index
