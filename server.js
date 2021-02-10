const express = require('express')
const app = express()
// const path = require('path')
const db = require('./database.js')

app.use(express.static(__dirname))
app.use(express.json())

/* app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/buses.html'))
}) */

app.post('/bus', db.createBus)
app.get('/buses', db.readBuses)
app.get('/bus:id', db.readBusById)
app.put('/bus', db.updateBus)
// app.delete('/buses', db.deleteBuses)
app.delete('/bus', db.deleteBus)

app.get('/seats:busId', db.readSeats)
app.put('/seat', db.updateSeat)

/*
app.get('/:location', (req, res) => {
  res.sendFile(path.join(__dirname, '/seats.html'))
}) */
app.listen(4000, () => {
  console.log('Server Listening on 4000', Date.now())
})
