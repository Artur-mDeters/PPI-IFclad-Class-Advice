const express = require('express')
const professorController = require('../controller/Professor.controller')

const routes = express.Router()

routes.get('/professores', professorController.getProfessores)
routes.get('/professores/:id', professorController.getProfessorById)

module.exports = routes