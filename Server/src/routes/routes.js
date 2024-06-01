const express = require('express')
const routes = express.Router();

const routeUsers = require('./user.routes')
const routeLogin = require('./login.routes')

routes.use(routeUsers)
routes.use(routeLogin)

module.exports = routes
