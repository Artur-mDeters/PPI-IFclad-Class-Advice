const express = require('express')
const routes = express.Router();

const routeUsers = require('./user.routes')
const routeLogin = require('./login.routes')
const routeTurmas = require('./turma.routes')
const routeProfessores = require('./professor.routes')
const routeCursos = require('./curso.routes')

routes.use(routeUsers)
routes.use(routeLogin)
routes.use(routeTurmas)
routes.use(routeProfessores)
routes.use(routeCursos)

module.exports = routes
