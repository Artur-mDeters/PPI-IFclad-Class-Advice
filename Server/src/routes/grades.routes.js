const express = require('express')
const gradesController = require('../controller/Grades.controller')

const routes = express.Router()

routes.get('/notas/:idDisciplina/:idTurma', gradesController.getAllGradesBySubject)
routes.post('/notas/:idDisciplina/', gradesController.addGrades)

module.exports = routes