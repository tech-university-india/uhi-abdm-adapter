const pathMap = require('../config/pathMap')

const requestValidator = (req, res, next) => {
  const schema = pathMap[req.url]
  if (!schema) {
    res.status(404).send('Not Found')
    return
  }
  const { error } = schema.validate(req.body)
  if (error) {
    res.status(400).send(error.message)
    return
  }
  next()
}

module.exports = requestValidator
