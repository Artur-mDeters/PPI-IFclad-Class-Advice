const express = require('express')
const routes = express.Router();

const routeUsers = require('./user.routes')
const routeLogin = require('./login.routes')
const routeClass = require('./class.routes')
const routeTeachers = require('./teacher.routes')
const routeCourses = require('./course.routes')
const routeStudents = require('./student.routes')

routes.use(routeUsers)
routes.use(routeLogin)
routes.use(routeClass)
routes.use(routeTeachers)
routes.use(routeCourses)
routes.use(routeStudents)

module.exports = routes
