const { AxiosError } = require('axios')
const { SERVICE_URLS } = require('../../config')
const { handleAxiosError } = require('../util/errorHandler')
const request = require('../util/makeRequest')

const callHealthService = async ({ method = 'POST', path, headers, data }) => {
  try {
    const response = await request.makeRequest(SERVICE_URLS.ABDM_HEALTH_SERVICE_URL, path, method, data, headers)
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
