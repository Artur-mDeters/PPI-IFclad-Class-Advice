const express = require('express')
const alunoController = require('../controller/Aluno.controller')

const routes = express.Router()

routes.post('/alunos', alunoController.addAluno)
routes.get('/alunos/:id', alunoController.getAlunos)

module.exports = routes