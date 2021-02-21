const express = require('express')
const app = express()
// const path = require('path')
const db = require('./database')

app.use(express.static(__dirname))
app.use(express.json())

app.post('/bus', db.createBus)
app.get('/buses', db.readBuses)
app.get('/bus:id', db.readBusById)
app.put('/bus', db.updateBus)
// app.delete('/buses', db.deleteBuses)
app.delete('/bus', db.deleteBus)

app.get('/seats/:busId', db.readSeats)
app.put('/seat', db.updateSeat)
app.listen(4000, () => {
  console.log('Server Listening on 4000', Date.now())
})