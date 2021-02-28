const router = require('express').Router()
const db = require('../db')

router.get('/', db.readBuses)

router.post('/bus', db.createBus)
// router.get('/bus:id', db.readBusById)
// router.put('/bus', db.updateBus)
// router.delete('/buses', db.deleteBuses)
// router.delete('/bus', db.deleteBus)

module.exports = router
