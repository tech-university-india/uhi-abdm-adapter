const cacheAxios = require('../utils/axios')

// Change this to custom aws lambda route while running locally - krke
const getToken = async () => {
  const { accessToken } = await cacheAxios({
    method: 'POST',
    url: `${process.env.GATEWAY_URL}/v0.5/sessions`,
    data: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    }
  }, true)
  return accessToken
}

module.exports = getToken
