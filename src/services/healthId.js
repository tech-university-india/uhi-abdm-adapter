const { default: axios } = require('axios')
const requiredHeaders = require('../config/requiredHeaders')
const getToken = require('./gateway')

const healthId = async (path, method, headers, body) => {
  const accessToken = await getToken()
  const required = Object.keys(headers).filter(header => requiredHeaders.includes(header))
  const response = await axios({
    method,
    url: `${process.env.HEALTH_ID_URL}${path}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...required
    },
    data: body
  })
  return response
}

module.exports = healthId
