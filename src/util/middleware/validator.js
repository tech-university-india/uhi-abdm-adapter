const joi = require('joi')
const config = require('../../../config')
const HEALTH_ID = config.ABDM_API_URLS.HEALTH_ID

const REQ_PARAMTERS = {
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params'
}

const schemas = {}
schemas[HEALTH_ID.LOGIN_GENERATE_OTP_MOBILE_URL] = joi.object({})

/**
 *
    * @param {joi.Schema} schema
 * @param {String} parameterType
 */

const validate = (schema, parameterType) => (req, res, next) => {
  const { error } = schema.validate(req[parameterType])
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  next()
}

module.exports = { validate, REQ_PARAMTERS, schemas }
