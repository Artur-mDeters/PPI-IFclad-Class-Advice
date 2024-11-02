const express = require('express')
const gradesController = require('../controller/Grades.controller')

const routes = express.Router()

routes.get('/notas/:idDisciplina/:idTurma', gradesController.getAllGradesBySubject)

module.exports = routes