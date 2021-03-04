const { busController } = require('../controllers')
const router = require('express').Router()

router.get('/', busController.readBuses)

router.post('/', busController.createBus)
router.delete('/:id', busController.deleteBus)
router.put('/', busController.updateBus)
// router.get('/bus:id', busController.readBusById)
// router.delete('/buses', busController.deleteBuses)
// router.delete('/bus', busController.deleteBus)

module.exports = router
