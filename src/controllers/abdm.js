const healthId = require('../services/healthId')

const abdm = async (req, res) => {
  try {
    const { baseUrl: path, method, headers, body } = req
    const response = await healthId(path, method, headers, body)
    res.status(response.status).send(response.data)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = abdm
