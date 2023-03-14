const redis = require('redis')

const USE_URL = process.env.USE_REDIS_URL || false
const REDIS_URL = process.env.REDIS_URL

const options = {
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },

  username: process.env.REDIS_USERNAME,
  name: process.env.REDIS_NAME,
  database: process.env.REDIS_DB,
  password: process.env.REDIS_PASSWORD
}

const finalOptions = USE_URL ? { url: REDIS_URL } : options
const client = redis.createClient(finalOptions)

module.exports = { client }
