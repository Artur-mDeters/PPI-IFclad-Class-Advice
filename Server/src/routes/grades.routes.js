const express = require('express')
const gradesController = require('../controller/Grades.controller')

const routes = express.Router()

routes.post('/notas/:idDisciplina/', gradesController.addGrades)
routes.get('/notas/:idDisciplina/:idTurma', gradesController.getAllGradesBySubject)
routes.get('/notasCalculadas/:idTurma', gradesController.getGradesToPDF)
// routes.get('/apresentacao', gradesController.getApresentationMode)

module.exports = routes