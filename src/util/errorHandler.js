const { AxiosError } = require('axios')
const { HttpError } = require('./errors/httpError')

const errorHandlerInRoute = (error, req, res) => {
  console.log(error)
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message })
    return
  }
  res.status(500).json({ message: 'Internal server error' })
}
const handleAxiosError = (error) => {
  if (error instanceof AxiosError) {
    const response = error.response
    throw new HttpError(response.data.details[0].message, 400)
  }
  throw Error(error)
}
module.exports = { errorHandlerInRoute, handleAxiosError }
