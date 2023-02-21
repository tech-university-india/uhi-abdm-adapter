const axios = require('axios')
const { client } = require('../redisConnection')
const TOKEN_EXPIRE = process.env.ABHA_SERVER_TOKEN_EXPIRY || 60 * 9
const SANDBOX_URL = process.env.SANDBOXURL
const adapterCallback = (config) => async (resolve, reject) => {
  try {
    const redisData = await client.get(config.url)
    if (redisData) {
      resolve({ data: redisData })
    } else {
      const data = await axios.get(SANDBOX_URL)
      await client.set(config.url, data.data, { EX: TOKEN_EXPIRE })
      resolve(data)
    }
  } catch (error) {
    reject(error)
  }
}

const redisAdapter = (config) => {
  return new Promise(adapterCallback(config))
}

const axiosInstance = axios.create({
  adapter: redisAdapter
})

const fetchJWTTokenFromAdapter = async () => {
  const response = await axiosInstance.get(SANDBOX_URL)
  return response.data
}
/**
 *
 * @param {import('express').Request} request
 * @param {*} response
 * @param {*} next
 */
const getJWTToken = async (request, response, next) => {
  try {
    const token = await fetchJWTTokenFromAdapter()
    request.headers.authorization = `Bearer ${token}`
    next()
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = { getJWTToken }
