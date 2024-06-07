const express = require('express')
const cursoController = require('../controller/Curso.controller')

const routes = express.Router()

routes.get('/cursos', cursoController.getCursos)
routes.get('/cursos/:id', cursoController.getCursoById)
// routes.post('/cursos', cursoController.addCurso)

module.exports = routes