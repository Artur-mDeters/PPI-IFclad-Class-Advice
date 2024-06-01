const express = require('express')
const routes = express.Router();

const routeUsers = require('./user.routes')

routes.use(routeUsers)

module.exports = routes
