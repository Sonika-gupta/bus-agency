const { serviceProviderController: controller } = require('../controllers')
const router = require('express').Router()

router.get('/', controller.readServiceProviders)
router.post('/', controller.createServiceProvider)
router.delete('/:id', controller.deleteServiceProvider)
router.put('/', controller.updateServiceProvider)

module.exports = router
