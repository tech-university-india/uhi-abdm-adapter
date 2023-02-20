const { AxiosError } = require('axios')
const { HttpError } = require('../../src/util/errors/httpError')
const { errorHandlerInRoute, handleAxiosError } = require('../../src/util/errorHandler')
describe('Error Handler', () => {
  describe('Error Handler in Route', () => {
    it('should send a 4xx error when Http Error', () => {
      const error = new HttpError('Bad Request', 400)
      const req = {}
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }
      errorHandlerInRoute(error, req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Bad Request' })
    })
    it('should send a 500 error when Server Error', () => {
      const error = new Error('Error')
      const req = {}
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }
      errorHandlerInRoute(error, req, res)
      expect(res.status).toHaveBeenCalledWith(500)
    })
  })
  describe('Axios Error Handler', () => {
    it('should throw Http Error when Axios Error', () => {
      const error = new AxiosError('Bad Request', 400, {}, {}, {
        data: {
          details: [
            { message: 'Bad Request' }
          ]
        }
      })
      expect(() => {
        handleAxiosError(error)
      }).toThrowError(HttpError)
    })
    it('should throw 500 when unknown error', () => {
      const error = new Error('Error')
      expect(() => {
        handleAxiosError(error)
      }).toThrowError(Error)
    })
  })
})
