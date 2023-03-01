require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.text())

const PORT = process.env.PORT || 9007

app.use('*', (req, res) => {
  res.sendStatus(200)
  res.json({ status: 'OK' })
})

app.listen(PORT, () => console.log(`Started on port ${PORT}`))
