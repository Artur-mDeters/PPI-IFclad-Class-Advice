const express = require('express')
const turmaController = require('../controller/Turma.controller')

const routes = express.Router()


routes.post('/cursos', turmaController.addTurma)
routes.get('/cursos/:id', turmaController.getTurmaById)
routes.get('/cursos', turmaController.getTurma)