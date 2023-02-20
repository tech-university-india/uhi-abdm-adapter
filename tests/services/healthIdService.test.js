const { default: axios, Axios, AxiosError } = require('axios')
const { HttpError } = require('../../src/util/errors/httpError')
const healthIdService = require('./../../src/services/healthIdService')
describe('ABDM Service for Health ID', () => {
  describe('Generic fn for API calls', () => {
    it('should return 200', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue({ status: 200, data: {} })
      const data = await healthIdService.handleRequest('LOGIN_GENERATE_OTP_MOBILE_URL', { headers: {}, body: {} })
      expect(data.status).toBe(200)
      expect(data.data).toEqual({})
    })

    it('should return 400 error', async () => {
      jest.spyOn(axios, 'request').mockRejectedValue(
        new AxiosError('Bad Request', 400, {}, {}, {
          data: {
            details: [
              { message: 'Bad Request' }
            ]
          }
        })
      )

      try {
        await healthIdService.handleRequest('LOGIN_GENERATE_OTP_MOBILE_URL', { headers: {}, body: {} })
      } catch (error) {
        expect(error.message).toBe('Bad Request')
      }
    })
  })
})
