const { default: axios } = require('axios')
const { SERVICE_URLS } = require('../../config')
const { handleAxiosError } = require('../util/errorHandler')

const callHealthService = async ({ method = 'POST', path, headers, body }) => {
  try {
    const response = await axios.request({
      baseURL: SERVICE_URLS.ABDM_HEALTH_SERVICE_URL,
      method,
      url: path,
      headers,
      body
    })
    return { data: response.data, status: response.status }
  } catch (error) {
    handleAxiosError(error)
  }
}

const handleRequest = async (path, request) => {
  const { headers, body } = request
  const response = await callHealthService({ path, headers, body })
  return response
}

module.exports = { handleRequest, callHealthService }
