const { userController } = require('../controllers')
const router = require('express').Router()

router.get('/', userController.readUsers)
router.get('/filter', userController.filterUsers)
router.post('/', userController.createUser)
router.delete('/:id', userController.deleteUser)
router.put('/', userController.updateUser)

module.exports = router
