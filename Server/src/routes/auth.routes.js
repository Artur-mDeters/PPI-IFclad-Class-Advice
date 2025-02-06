const express = require('express')
const authController = require('../controller/auth.controller')

const routes = express.Router()

routes.post('/login', authController.login)
routes.put('/recover-password', authController.recoveryPassword)

module.exports = routes