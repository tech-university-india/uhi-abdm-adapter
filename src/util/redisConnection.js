const redis = require('redis')
require('dotenv').config()
const USE_URL = process.env.USE_REDIS_URL || false
const REDIS_URL = process.env.REDIS_URL

const options = {
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT) || 6379
  },

  username: process.env.REDIS_USERNAME,
  name: process.env.REDIS_NAME,
  database: parseInt(process.env.REDIS_DB || 1),
  password: process.env.REDIS_PASSWORD
}

const finalOptions = USE_URL ? { url: REDIS_URL } : options
const client = redis.createClient(finalOptions)

module.exports = { client }
