import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { Db, MongoClient } from 'mongodb'

import dbMiddleware from '../../middleware/database'

export interface ExtendedRequest {
  db: Db
  dbClient: MongoClient
  query: {
    page: string
    perPage: string
  }
}

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler
  .use(dbMiddleware)
  .get<ExtendedRequest>(async (req, res) => {
    try {
      const { perPage = '20', page = '0' } = req.query

      const collection = req.db.collection('makeup')
      const products = await collection
        .find()
        .skip(parseInt(page) > 0 ? (parseInt(page) * parseInt(perPage)) : 0)
        .limit(parseInt(perPage))

      return res.status(200).json(await products.toArray())

    } catch (error) {
      throw new Error(`Error in getting /products: ${error}`)
    }
  })

export default handler
