/* eslint-disable no-undef */
const controller = require('../../src/controllers/abdmController')
const healthIdService = require('../../src/services/healthIdService')
const { HttpError } = require('../../src/util/errors/httpError')
describe('ABDM Controller', () => {
  describe('Find Path in Existing Routes', () => {
    it('should return key and route', () => {
      const path = '/v2/registration/mobile/login/generateOtp'
      const { key, route } = controller.findPathInExistingRoutes(path)
      expect(key).toBe('HEALTH_ID')
      expect(route).toBe('LOGIN_GENERATE_OTP_MOBILE_URL')
    })
    it('should throw error', () => {
      const path = '/v2/registration/mobile/login/generateOtp1'
      expect(() => controller.findPathInExistingRoutes(path)).toThrowError()
    })
  })

  describe('Route Controller', () => {
    it('should return 200', async () => {
      const actual = jest.requireActual('./../../src/controllers/abdmController')
      jest.spyOn(actual, 'findPathInExistingRoutes').mockReturnValue({ key: 'HEALTH_ID', route: 'LOGIN_GENERATE_OTP_MOBILE_URL' })
      jest.spyOn(healthIdService, 'handleRequest').mockResolvedValue({ status: 200, response: {} })
      const request = {
        headers: {},
        body: {},
        params: { 0: '/v2/registration/mobile/login/generateOtp' }
      }
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }
      await controller.routeController(request, response)
      expect(response.status).toHaveBeenCalledWith(200)
      expect(response.json).toHaveBeenCalledWith({})
    })
    it('should return 404', async () => {
      const actual = jest.requireActual('./../../src/controllers/abdmController')
      jest.spyOn(actual, 'findPathInExistingRoutes').mockImplementation(() => { throw new HttpError('Route not found') })
      const request = {
        headers: {},
        body: {},
        params: { 0: '/v2/registration/mobile/' }
      }
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }
      await controller.routeController(request, response)
      expect(response.status).toHaveBeenCalledWith(404)
      expect(response.json).toHaveBeenCalledWith({ message: 'Route not found' })
    })
  })
})
