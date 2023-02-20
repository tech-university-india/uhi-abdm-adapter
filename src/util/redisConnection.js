const redis = require('redis')

const options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  name: process.env.REDIS_NAME,
  database: process.env.REDIS_DB,
  password: process.env.REDIS_PASSWORD
}

const client = redis.createClient(options)

module.exports = { client }
