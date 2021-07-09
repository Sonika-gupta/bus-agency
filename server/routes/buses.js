const { busController } = require('../controllers')
const router = require('express').Router()

router.get('/', busController.readBuses)
router.get('/filter', busController.filterBuses)
router.post('/', busController.createBus)
router.delete('/:id', busController.deleteBus)
router.put('/', busController.updateBus)

module.exports = router
