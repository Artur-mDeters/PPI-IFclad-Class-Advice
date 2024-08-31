const express = require('express')
const cursoController = require('../controller/Curso.controller')

const routes = express.Router()

routes.get('/cursos', cursoController.getCursos)
routes.get('/cursos/:id', cursoController.getCursoById)
routes.post('/cursos', cursoController.addCurso)
routes.put('/cursos/edit/:id', cursoController.editCurso)
routes.delete('/cursos/:id', cursoController.deleteCurso)

module.exports = routes