import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable!')
}

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

/**
 * DB connection for SSG
 */
export const openDb = async () => {
  if (!client.isConnected()) {
    await client.connect()
  }

  return {
    client,
    db: client.db('makeup_shop')
  }
}

/**
 * Middleware adding DB connection to calls
 * @param req
 * @param res
 * @param next
 */
const database = async (req, res, next) => {

  if (!client.isConnected()) {
    await client.connect()
  }

  req.dbClient = client
  req.db = client.db('makeup_shop')

  return next()
}

const middleware = nextConnect()
middleware.use(database)

export default middleware
