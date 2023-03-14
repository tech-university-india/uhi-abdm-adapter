const { AxiosError } = require('axios')
const { handleRequest } = require('../../src/services/healthIdService')
const makeRequest = require('../../src/util/makeRequest')
describe('ABDM Service for Health ID', () => {
  describe('Generic fn for API calls', () => {
    it('should return 200', async () => {
      jest.spyOn(makeRequest, 'makeRequest').mockResolvedValue({
        data: {},
        status: 200
      })

      const data = await handleRequest('LOGIN_GENERATE_OTP_MOBILE_URL', 'POST', { headers: {}, body: {} })

      expect(data.status).toBe(200)

      expect(data.data).toEqual({})
    })

    it('should return 400 error', async () => {
      try {
        jest.spyOn(makeRequest, 'makeRequest').mockRejectedValue(new Error())

        await handleRequest('LOGIN_GENERATE_OTP_MOBILE_URL', 'POST', { headers: {}, body: {} })
      } catch (error) {
        expect(error.message).toBe('Something went wrong')
      }
    })

    it('should throw an axios error when there is some error with axios call', () => {
      jest.spyOn(makeRequest, 'makeRequest').mockRejectedValue(new AxiosError(undefined, undefined, undefined, undefined
        , {
          data: {
            details: [
              {
                message: 'Bad request'
              }
            ]
          }
        }
      ))
      expect(handleRequest('LOGIN_GENERATE_OTP_MOBILE_URL', 'POST', { headers: {}, body: {} })).rejects.toThrow('Bad request')
    })
  })
})
