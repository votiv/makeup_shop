import { FunctionComponent } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Tippy from '@tippyjs/react'
import styled from 'styled-components'
import 'tippy.js/dist/tippy.css';
import { Collection } from 'mongodb'

import { openDb } from '../../middleware/database'
import { getRandomItem } from '../../utils/arrayUtils'
import {
  Container,
  FlexRowCentered,
  FlexRow,
  Box,
  FlexRowSpaceBetween,
  FlexRowStart,
  FlexColumnCentered
} from '../../components/layout'
import { Typography, Bold, Italic } from '../../components/typography'
import { Image, ImageWrapper } from '../../components/image'
import { Rating } from '../../components/Rating'
import { Grid } from '../../components/layout'
import { Color } from '../../components/Color'
import { AnchorButton } from '../../components/buttons'
import { DEFAULT_COLOR } from '../../utils/constants/constants'
import { ColorType, ProductType } from '../../types/types'

/**
 * Product Details page
 * @param product
 */
const Product: FunctionComponent<{ product: ProductType }> = ({ product }) => {
  const {
    product_colors,
    name,
    price,
    price_sign,
    rating,
    description,
    tag_list,
    product_link,
    api_featured_image,
    brand
  } = product

  /**
   * If the current product doesn't have colors, assign the default color
   */
  const color = product_colors?.length > 0
    ? getRandomItem<ColorType>(product_colors).hex_value
    : DEFAULT_COLOR

  return (
    <Container as="main">
      <Box padding="3rem 0" marginBottom="2.5rem">
        <Typography variant="h1" align="center" borderColor={color}>{name}</Typography>
      </Box>

      <ProductWrapper>
        <ImageWrapper color={color}>
          <Image src={api_featured_image} alt={name} />
        </ImageWrapper>

        <DetailsWrapper>
          <Box marginBottom="1rem">
            <DetailsTitle>
              <p style={{ flex: '1 1 auto' }}>Brand: {brand}</p>
              <p>Price: {`${price_sign || '$'} ${price}`}</p>
              <Rating rating={rating} />
            </DetailsTitle>
          </Box>

          <Box marginBottom="2rem">
            <Typography variant="p" align="justify">{description}</Typography>
          </Box>

          {
            product_colors.length > 0 && (
              <>
                <Box marginBottom="1rem"><FlexRow width="100%"><Bold>Colors:</Bold></FlexRow></Box>
                <Grid minMax="2.5rem">
                  {product_colors.map((color, index) => (
                    <Tippy content={color.colour_name} key={index}>
                      <Color color={color.hex_value} />
                    </Tippy>
                  ))}
                </Grid>
              </>
            )
          }

          <Box margin="2rem 0" padding="0 1rem" maxHeight="12.5rem">
            <FlexRowCentered>
              {
                tag_list.map(tag => (
                  <Box marginBottom="2rem" key={tag}>
                    <ProductTag>{tag}</ProductTag>
                  </Box>
                ))
              }
            </FlexRowCentered>
          </Box>

          <Box width="14rem">
            <FlexRowSpaceBetween>
              <AnchorButton url={product_link} color={color}>
                Buy Now
              </AnchorButton>
              <AnchorButton url="/" color={color} bwButton>
                Back
              </AnchorButton>
            </FlexRowSpaceBetween>
          </Box>
        </DetailsWrapper>

      </ProductWrapper>
    </Container>
  )
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await openDb()
  const collection: Collection<ProductType> = await db.collection('makeup')
  const data = await collection.find()
  const products = await data.toArray()

  const paths = products ? products.map(d => ({
    params: { id: d.id.toString() }
  })) : []

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params
  const { db } = await openDb()
  const collection: Collection<ProductType> = await db.collection('makeup')
  // @ts-ignore  // id gives TS error, not sure why
  const product = await collection.find({ id: parseInt(id as string) })
  const found = await product.next()

  if (!found) {
    return {
      notFound: true
    }
  }

  return { props: { product: JSON.parse(JSON.stringify(found)) } }
}

const ProductTag = styled(Italic)`
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`

const DetailsWrapper = styled(FlexColumnCentered)`
  padding: 0 3rem 3rem;
`

const DetailsTitle = styled(Bold)`
  width: 100%;
`

const ProductWrapper = styled(FlexRowStart)`
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`
