import { Db, MongoClient } from 'mongodb'

export interface IndexType {
  products: Array<ProductType[]>
}

export interface ColorType {
  hex_value: string
  colour_name: string
}

export interface ProductType {
  id: string
  product_colors: ColorType[]
  name: string
  price: string
  price_sign: string
  rating: string
  description: string
  tag_list: string[]
  product_link: string
  api_featured_image: string
  brand: string
  bColor: string
}

export interface ExtendedRequest {
  db: Db
  dbClient: MongoClient
  query: {
    page: string
    perPage: string
    search: string
  }
}
