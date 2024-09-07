const express = require('express')
const teacherController = require('../controller/Teacher.controller')

const routes = express.Router()

routes.get('/professores', teacherController.getProfessores)
routes.get('/professores/:id', teacherController.getProfessorById)

module.exports = routes