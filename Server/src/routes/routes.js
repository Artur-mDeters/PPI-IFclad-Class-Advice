const express = require('express')
const routes = express.Router();

const routeUsers = require('./user.routes')
const routeLogin = require('./login.routes')
const routeTurmas = require('./turma.routes')
const routeProfessores = require('./professor.routes')

routes.use(routeUsers)
routes.use(routeLogin)
routes.use(routeTurmas)
routes.use(routeProfessores)

module.exports = routes
