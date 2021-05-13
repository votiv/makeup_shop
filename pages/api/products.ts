import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { Db, MongoClient } from 'mongodb'

import dbMiddleware from '../../middleware/database'

interface ExtendedRequest {
  db: Db
  dbClient: MongoClient
}

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler
  .use(dbMiddleware)
  .get<ExtendedRequest>(async (req, res) => {
    try {
      const { perPage = '20', page = '0' } = req.body

      const collection = req.db.collection('makeup')
      const products = await collection
        .find()
        .skip(parseInt(page) > 0 ? ((parseInt(page) - 1) * parseInt(perPage)) : 0)
        .limit(parseInt(perPage))

      res.status(200).json(await products.toArray())

      await req.dbClient.close()

    } catch (error) {
      throw new Error(`Error in getting products: ${error}`)
    }
  })

export default handler
