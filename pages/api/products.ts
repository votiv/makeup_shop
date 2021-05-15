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
    search: string
  }
}

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler
  .use(dbMiddleware)
  .get<ExtendedRequest>(async (req, res) => {
    try {
      const { perPage = '20', page = '0', search = '' } = req.query

      const collection = req.db.collection('makeup')
      const filtered = !!search
        ? await collection
          .find({ $text: { $search: search, $caseSensitive: false } })
        : await collection
          .find()

      const products = await filtered
        .skip(parseInt(page) > 0 ? (parseInt(page) * parseInt(perPage)) : 0)
        .limit(parseInt(perPage))

      return res.status(200).json(await products.toArray())

    } catch (error) {
      res.status(error.code).send(`Error in getting /products: ${error}`)
    }
  })

export default handler
