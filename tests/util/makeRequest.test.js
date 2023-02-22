const { makeRequest, adapterCallback, redisAdapter } = require('../../src/util/makeRequest')
const axios = require('axios')
const { client } = require('../../src/util/redisConnection')
jest.mock('axios')

describe('Make Request Function', () => {
  describe('makeRequest', () => {
    const baseURL = 'http://example.com'
    const url = '/path/to/resource'
    const method = 'GET'
    const data = {}
    const headers = {}

    // Mock the axios function to avoid making actual requests during tests
    const mockAxios = axios

    afterEach(() => {
      // Reset all mocks after each test
      jest.resetAllMocks()
    })

    it('should make a request with the correct parameters', async () => {
      // Define expected values
      const expectedResponse = { data: 'response data' }
      const expectedConfig = {
        adapter: expect.any(Function),
        baseURL,
        url,
        method,
        data,
        headers
      }

      // Mock the axios function to return the expected response
      mockAxios.mockResolvedValue(expectedResponse)

      // Call the makeRequest function
      const response = await makeRequest(baseURL, url, method, data, headers)

      // Expect the axios function to have been called with the expected parameters
      expect(mockAxios).toHaveBeenCalledWith(expectedConfig)

      // Expect the response to match the expected value
      expect(response).toEqual(expectedResponse)
    })

    it('should reject the promise if the request fails', async () => {
      // Define an error object to be thrown by the axios function
      const error = new Error('Request failed')

      // Mock the axios function to throw the error
      mockAxios.mockRejectedValue(error)

      // Call the makeRequest function
      await expect(makeRequest(baseURL, url, method, data, headers)).rejects.toThrow(error)
    })
  })

  describe('Tests for adapter callback', () => {
    const config = {
      baseURL: 'http://example.com',
      url: '/path/to/resource',
      method: 'GET',
      data: {},
      headers: {}
    }
    it('should call the adapter callback when token is in redis', async () => {
      jest.spyOn(client, 'get').mockResolvedValue('token')
      const mockAxios = axios
      mockAxios.mockResolvedValue({ data: 'response data' })
      const result = await new Promise(adapterCallback(config))
      expect(result.data).toBe('response data')
    })
    it('when token is not in redis, it will fetch a token', async () => {
      jest.spyOn(client, 'get').mockResolvedValue(null)
      jest.spyOn(client, 'set').mockResolvedValue('OK')
      jest.spyOn(axios, 'get').mockResolvedValue('response data')
      const result = await new Promise(adapterCallback(config))
      expect(result.data).toBe('response data')
    })

    it('should throw an error when there is some issue', () => {
      jest.spyOn(client, 'get').mockResolvedValue('null')
      const mockAxios = axios
      mockAxios.mockRejectedValue(new Error('Request failed'))
      expect(redisAdapter(config)).rejects.toThrow(new Error('Request failed'))
    })
  })
})
