import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { Collection } from 'mongodb'

import dbMiddleware from '../../middleware/database'
import { ExtendedRequest, ProductType } from '../../types/types'

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler
  .use(dbMiddleware)
  /**
   * GET return paginated or filtered results from DB
   */
  .get<ExtendedRequest>(async (req, res) => {
    try {
      const { perPage = '20', page = '0', search = '' } = req.query

      const collection: Collection<ProductType> = req.db.collection('makeup')
      const filtered = !!search
        ? await collection
          .find({ $text: { $search: search, $caseSensitive: false } })
        : await collection
          .find()

      const products = await filtered
        .skip(parseInt(page) > 0 ? (parseInt(page) * parseInt(perPage)) : 0)
        .limit(parseInt(perPage))

      const withBColor = products.map(p => ({
        ...p,
        bColor: p.product_colors[0]?.hex_value
      }))

      return res.status(200).json(await withBColor.toArray())

    } catch (error) {
      res.status(error.code).send(`Error in getting /products: ${error}`)
    }
  })

export default handler
