const { AxiosError } = require('axios')
const healthId = require('../services/healthId')

const abdm = async (req, res) => {
  try {
    const { baseUrl: path, method, headers, body } = req
    const response = await healthId(path, method, headers, body)
    res.status(response.status).send(response.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      res
        .status(error.response.status)
        .json({ message: error.response.data?.details[0].message ?? 'Some Error Occoured' })
    } else {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = abdm
