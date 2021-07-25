const express = require('express')
const app = express()
const path = require('path')
const config = require('./config')
const { busRoute } = require('./routes')

// app.use(express.static('public'))
app.use(express.json())
app.use('/api/buses', busRoute)
app.listen(config.port, () => {
  console.log(`Server Listening on ${config.port}`, Date.now())
})
