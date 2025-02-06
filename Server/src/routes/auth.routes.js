const express = require('express')
const authController = require('../controller/auth.controller')

const routes = express.Router()

routes.post('/login', authController.login)

module.exports = routes