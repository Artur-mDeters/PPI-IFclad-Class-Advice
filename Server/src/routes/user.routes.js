const express = require('express')
const userController = require("../controller/User.controller")

const routes = express.Router()

routes.get('/users', userController.getUsers)
routes.get('/users/:id', userController.getUserById)
routes.post('/users', userController.addUser)
routes.delete('/users/:id', userController.deleteUser)

module.exports = routes