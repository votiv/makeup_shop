import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'

import dbMiddleware from '../../middleware/database'

interface ExtendedRequest {
  db: Db
}

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler
  .use(dbMiddleware)
  .get<ExtendedRequest>(async (req, res) => {
    try {
      const collection = req.db.collection('makeup')
      const products = await collection.find()

      res.status(200).json(await products.toArray())

    } catch (error) {
      throw new Error(`Error in getting products: ${error}`)
    }
  })

export default handler
