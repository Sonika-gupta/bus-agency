const express = require('express')
const app = express()
const path = require('path')
const config = require('./config')
const busRoute = require('./routes/buses')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use('/buses', busRoute)
app.listen(config.port, () => {
  console.log(`Server Listening on ${config.port}`, Date.now())
})
