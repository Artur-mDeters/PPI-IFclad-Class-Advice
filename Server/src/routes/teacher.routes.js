const express = require('express')
const teacherController = require('../controller/Teacher.controller')

const routes = express.Router()

routes.get('/professores', teacherController.getProfessores)
routes.get('/professores/:id', teacherController.getProfessorById)
routes.post('/professores', teacherController.addTeacher)
routes.put('/professores/:id', teacherController.editTeacher)
routes.delete('/professores/:id', teacherController.deleteTeacher)

module.exports = routes