const { ABDM_API_URLS } = require('../../config')
const { HttpError } = require('../util/errors/httpError')
const { errorHandlerInRoute } = require('../util/errorHandler')
const healthIdService = require('../services/healthIdService')

const findPathInExistingRoutes = (path) => {
  for (const key in ABDM_API_URLS) {
    for (const [route, val] of Object.entries(ABDM_API_URLS[key])) {
      if (val === path) {
        return { key, route, path }
      }
    }
  }
  throw new HttpError('Route not found', 404)
}
/**
  *
  * @param {import('express').Request} request
  * @param {*} response
  */
const routeController = async (request, response) => {
  try {
    const param = request.params['0']
    const { key, path } = findPathInExistingRoutes(param.replace('/api', ''))
    const { headers, body } = request

    let data = null
    if (key === 'HEALTH_ID') {
      data = await healthIdService.handleRequest(path, request.method, { headers, body })
    }
    console.log(data)
    response.status(data.status).json(data.response)
  } catch (error) {
    errorHandlerInRoute(error, request, response)
  }
}

module.exports = { routeController, findPathInExistingRoutes }
