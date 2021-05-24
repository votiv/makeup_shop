import { FunctionComponent, useCallback, useEffect, useReducer, KeyboardEvent } from 'react'
import { useSWRInfinite } from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Collection } from 'mongodb'
import { GetStaticProps } from 'next'

import { fetcher } from '../utils/fetcher'
import { bwText } from '../utils/calcTextColor'
import { Box, Container, Grid, FlexRowCentered, AbsoluteCentered } from '../components/layout'
import ImageFallback from '../components/ImageFallback'
import { Fallback } from '../components/Fallback'
import { Card, CardDetails } from '../components/card'
import { DEFAULT_COLOR, MAIN_BLUE_COLOR, PAGE_SIZE } from '../utils/constants/constants'
import { Button } from '../components/buttons'
import Spinner from '../components/Spinner'
import { Typography } from '../components/typography'
import { FilterHeader } from '../components/filter'
import { SearchActionKind, SearchActionType, SearchStateType } from '../components/filter/types'
import { openDb } from '../middleware/database'
import { IndexType, ProductType } from '../types/types'

/**
 * Reducer to be invoked on search action
 * @param state
 * @param action
 */
const searchReducer = (state: SearchStateType, action: SearchActionType) => {
  switch (action.type) {
    case SearchActionKind.Search:
      return action.payload
    default:
      return state
  }
}

/**
 * Products List page
 * @param props
 */
const Index: FunctionComponent<IndexType> = props => {
  const router = useRouter()

  /**
   * Get the list of products. On first load the page will come statically generated with the initial list,
   * after which SWR help out with caching, pagination, etc.
   */
  const { data, error, size, setSize, mutate } = useSWRInfinite<Array<ProductType>, Error>(
    (pageIndex, previousPageData) =>
      (previousPageData && !previousPageData.length)
        ? null
        : `/api/products?perPage=${PAGE_SIZE}&page=${pageIndex}&search=${search}`,
    fetcher,
    { initialData: props.products }
  )
  const products = data ? new Array<ProductType>().concat(...data) : []

  const isLoadingInitialData = !data && !error
  const isLoadingMore = !isLoadingInitialData && (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.length === 0 || data?.[0]?.length === 0
  const isReachingEnd = !!isEmpty || products?.length < PAGE_SIZE || (data && data[data.length - 1]?.length < PAGE_SIZE)

  /**
   * We have to manually run the fetcher for search
   */
  const [search, dispatchSearch] = useReducer(searchReducer, '')
  useEffect(() => {
    fetcher<ProductType[][]>(`/api/products?search=${search}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => mutate(res, false))
  }, [search])

  /**
   * Loading state
   */
  if (!products) {
    return <AbsoluteCentered><Spinner color={MAIN_BLUE_COLOR} /></AbsoluteCentered>
  }

  /**
   * Error state
   */
  if (error) {
    return <AbsoluteCentered>Something went horribly wrong, please try again later</AbsoluteCentered>
  }

  /**
   * When tabbing through the list, the user should be able to access the details page of a product by pressing Enter
   */
  const handleCardKeyNav = useCallback((id: string) => async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      await router.push(`/product/${id}`)
    }
  }, [])

  /**
   * Create the list of Card components
   */
  const mapProducts = useCallback((product: ProductType, index: number) => (
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
                      ? null
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

export const getStaticProps: GetStaticProps = async () => {
  const { db } = await openDb()
  const collection: Collection<ProductType> = await db.collection('makeup')
  const products = await collection.find().limit(PAGE_SIZE)

  if (!products) {
    return {
      notFound: true
    }
  }

  const withBColor = products.map(p => ({
    ...p,
    bColor: p.product_colors[0]?.hex_value
  }))

  return { props: { products: JSON.parse(JSON.stringify(await withBColor.toArray())) } }
}
