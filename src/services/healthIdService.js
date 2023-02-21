const { default: axios } = require('axios')
const { SERVICE_URLS } = require('../../config')
const https = require('https')
const { handleAxiosError } = require('../util/errorHandler')

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
    console.log(error)
    handleAxiosError(error)
  }
}

const handleRequest = async (path, method, request) => {
  const { headers, body } = request

  const response = await callHealthService({ method, path, headers, body })
  return response
}

module.exports = { handleRequest, callHealthService }
