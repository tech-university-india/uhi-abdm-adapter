const { AxiosError } = require('axios')
const { errorHandlerInRoute, handleAxiosError } = require('../../src/util/errorHandler')
const { HttpError } = require('../../src/util/errors/httpError')

describe('Tests for Error Handler', () => {
  it('should return 500 error', async () => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const error = new Error('Internal server error')
    errorHandlerInRoute(error, req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })
  it('should return 400 error', async () => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const error = new HttpError('Bad request', 400)
    errorHandlerInRoute(error, req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Bad request' })
  })
})
it('should set message as response\'s data messsge when details key do not exists', () => {
  const error = new AxiosError(undefined, undefined, undefined, undefined, {
    response: {
      data: {
        details: [
          {
            message: 'Bad request'

          }
        ]
      }
    }
  })
  expect(() => handleAxiosError(error)).toThrow(HttpError)
})
