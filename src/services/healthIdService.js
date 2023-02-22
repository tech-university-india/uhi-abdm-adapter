const { default: axios } = require('axios')
const { SERVICE_URLS } = require('../../config')
const https = require('https')
const { handleAxiosError } = require('../util/errorHandler')
const makeRequest = require('../util/makeRequest')

const callHealthService = async ({ method = 'POST', path, headers, body }) => {
  try {
    const response = axios({

      method,
      url: 'https://healthidsbx.abdm.gov.in/api/v2/registration/mobile/login/userAuthorizedToken',
      headers,
      data: body
    })

    // const response = await axios.post(SERVICE_URLS.ABDM_HEALTH_SERVICE_URL + path, body, {
    //   headers
    // })
    // console.log(response)
    return { data: response.data, status: response.status }
  } catch (error) {
    if (error instanceof AxiosError) {
      return handleAxiosError(error)
    }
    throw new Error('Something went wrong')
  }
}

const handleRequest = async (path, method, request) => {
  const headers = { 'X-Token': request.headers['X-Token'] ?? undefined, 'T-Token': request.headers['T-Token'] ?? undefined }
  const response = await callHealthService({ method, path, headers, data: request.body })
  return response
}

module.exports = { handleRequest, callHealthService }
