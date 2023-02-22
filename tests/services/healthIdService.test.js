const service = require('../../src/services/healthIdService')

describe('ABDM Service for Health ID', () => {
  describe('Generic fn for API calls', () => {
    it('should return 200', async () => {
      beforeEach(e => {
        jest.mock('../../src/services/healthIdService', () => {
          const originalModule = jest.requireActual('../../src/services/healthIdService')
          console.log(originalModule)
          return {
            ...originalModule,
            callHealthService: jest.fn(() => Promise.resolve({ data: {}, status: 200 }))
          }
        })
      })

      const data = await service.handleRequest('LOGIN_GENERATE_OTP_MOBILE_URL', 'POST', { headers: {}, body: {} })
      console.log(data)
      // beforeEach(e => {
      //   jest.mock('callHealthService', () => () => Promise.reject(new ('Bad Request', 400, {}, {}, {
      //     data: {
      //       details: [
      //         { message: 'Bad Request' }
      //       ]
      //     }
      //   })()))
      // })
      // const data = await service.handleRequest('LOGIN_GENERATE_OTP_MOBILE_URL', 'POST', { headers: {}, body: {} })

      expect(data.status).toBe(200)

      expect(data.data).toEqual({})
    })

    xit('should return 400 error', async () => {
      // const callHealthService = jest.fn()
      // jest.mock('callHealthService', () => () => Promise.reject(new AxiosError('Bad Request', 400, {}, {}, {
      //   data: {
      //     details: [
      //       { message: 'Bad Request' }
      //     ]
      //   }
      // })))
      //  jest.spyOn(healthIdService, 'callHealthService').mockRejectedValue(

      // )

      try {
        await service.handleRequest('LOGIN_GENERATE_OTP_MOBILE_URL', 'POST', { headers: {}, body: {} })
      } catch (error) {
        expect(error.message).toBe('Bad Request')
      }
    })
  })
})
