const { operatorController: controller } = require('../controllers')
const router = require('express').Router()

router.get('/', controller.readOperators)
router.post('/', controller.createOperator)
router.delete('/:id', controller.deleteOperator)
router.put('/', controller.updateOperator)

module.exports = router
