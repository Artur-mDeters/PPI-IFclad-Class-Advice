const express = require('express')
const turmaController = require('../controller/Turma.controller')

const routes = express.Router()


routes.post('/turmas', turmaController.addTurma)
routes.get('/turmas/:id', turmaController.getTurmaById)
routes.get('/turmas', turmaController.getTurmas)
routes.put('/turmas/editar/:id', turmaController.editTurma)
routes.get('/turmas/editar/:id', turmaController.getTurmaById)

module.exports = routes 