const axios = require('axios')
const jwt = require('jsonwebtoken')
const { setCache, getCache } = require('./redis')

let DEFAULT_EXPIRY = 60

const cacheAxios = async (requestOptions, isToken) => {
  const cacheData = await getCache(requestOptions.url)
  if (cacheData) {
    return JSON.parse(cacheData)
  }
  const { data } = await axios(requestOptions)
  if (isToken) {
    const { exp } = jwt.decode(data.accessToken)
    DEFAULT_EXPIRY = exp - Math.floor(Date.now() / 1000)
  }
  await setCache(requestOptions.url, JSON.stringify(data), DEFAULT_EXPIRY)
  return data
}

module.exports = cacheAxios
