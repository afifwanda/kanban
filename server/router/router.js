const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization.js')
const authentication = require('../middleware/authentication.js')
const userController = require('../controller/userController.js')
const taskController = require('../controller/taskController.js')

router.post('/user/register',userController.register)
router.post('/user/login',userController.login)
// router.post('/user/googleLogin',userController.googleLogin)

router.get('/task',authentication,taskController.view)
router.post('/task',authentication,taskController.add)
router.get('/task/:id',authentication,authorization,taskController.getTask)
router.put('/task/:id',authentication,authorization,taskController.update)
router.delete('/task/:id',authentication,authorization,taskController.delete)


module.exports = router