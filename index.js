require('dotenv').config()
const express = require('express')
const app = express()
const { client } = require('./src/util/redisConnection')
const { getJWTToken } = require('./src/util/middleware/authToken')
const { routeController } = require('./src/controllers/abdmController')

client.connect()
client.on('connect', () => console.log('Redis client connected'))
app.use(express.json())
app.use(express.text())
app.use(getJWTToken)
const PORT = process.env.PORT || 9007

app.use('*', routeController)

app.listen(PORT, () => console.log(`Started on port ${PORT}`))
