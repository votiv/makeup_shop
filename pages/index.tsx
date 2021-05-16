import { useSWRInfinite } from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { fetcher } from '../utils/fetcher'
import { bwText } from '../utils/calcTextColor'
import { Box, Container, Grid, FlexRowCentered, AbsoluteCentered } from '../components/layout'
import ImageFallback from '../components/ImageFallback'
import { Fallback } from '../components/Fallback'
import { Card, CardDetails } from '../components/card'
import { getRandomItem } from '../utils/arrayUtils'
import { DEFAULT_COLOR, MAIN_BLUE_COLOR, PAGE_SIZE } from '../utils/constants/constants'
import { Button } from '../components/buttons'
import Spinner from '../components/Spinner'
import { Typography } from '../components/typography'
import { FilterHeader } from '../components/filter'
import { useCallback, useEffect, useReducer } from 'react'
import { SearchActionKind, SearchActionType, SearchStateType } from '../components/filter/interface'
import { GetStaticProps } from 'next'
import { openDb } from '../middleware/database'

const searchReducer = (state: SearchStateType, action: SearchActionType) => {
  switch (action.type) {
    case SearchActionKind.Search:
      return action.payload
    default:
      return state
  }
}

const Index = () => {
  const router = useRouter()

  const [search, dispatchSearch] = useReducer(searchReducer, '')

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      (previousPageData && !previousPageData.length)
        ? null
        : `/api/products?perPage=${PAGE_SIZE}&page=${pageIndex}&search=${search}`,
    fetcher
  )
  const products = data ? [].concat(...data) : []

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    !isLoadingInitialData &&
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.length === 0 || data?.[0]?.length === 0
  const isReachingEnd =
    !!isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  useEffect(() => {
    fetcher(`/api/products?search=${search}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => mutate(res, false))
  }, [search])

  if (!products) {
    return <AbsoluteCentered><Spinner color={MAIN_BLUE_COLOR} /></AbsoluteCentered>
  }

  if (error) {
    return <AbsoluteCentered>Something went horribly wrong, please try again later</AbsoluteCentered>
  }

  const handleCardKeyNav = id => event => {
    if (event.key === 'Enter') {
      router.push(`/product/${id}`)
    }
  }

  const mapProducts = useCallback((product, index) => (
    <Link
      href="/product/[id]"
      as={`/product/${product.id}`}
      key={product.id || index}
    >
      <Card backgroundColor={product.bColor || DEFAULT_COLOR} tabIndex={0} onKeyUp={handleCardKeyNav(product.id)}>
        <ImageFallback
          src={product.api_featured_image}
          fallbackSrc={Fallback}
          alt={product.name}
          objectFit="cover"
        />
        <CardDetails color={bwText(product.bColor || DEFAULT_COLOR)}>
          <Typography variant="h3">{product.name}</Typography>
          <Typography variant="p">Price: {`${product.price_sign || '$'} ${product.price}`}</Typography>
        </CardDetails>
      </Card>
    </Link>
  ), [products])

  return (
    <Container as="main">

      <FilterHeader doSearch={dispatchSearch} />

      <Box width="100%" height="80vh">
        <>
          <Grid minMax="17rem" as="section">
            {
              products.length > 0
                ? products.map(mapProducts)
                : !isLoadingInitialData && <Typography variant="p" align="center">No products to show</Typography>
            }
          </Grid>

          {
            products.length > 0 && (
              <Box margin="2rem 0">
                <FlexRowCentered>
                  {isLoadingMore
                    ? <Spinner color={MAIN_BLUE_COLOR} />
                    : isReachingEnd
                      ? <Typography variant="p" align="center">No products to show</Typography>
                      : <Button
                        disabled={isLoadingMore || isReachingEnd}
                        onClick={() => setSize(size + 1)}
                        color={MAIN_BLUE_COLOR}
                        style={{ borderRadius: '.33rem' }}
                      >
                        Load more
                      </Button>}
                </FlexRowCentered>
              </Box>
            )
          }

        </>
      </Box>
    </Container>
  )
}

export default Index
