const express = require('express')
const loginController = require('../controller/Login.controller.js')

const routes = express.Router()

routes.post('/login', loginController.getUserData)

module.exports = routes