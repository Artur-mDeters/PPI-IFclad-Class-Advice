const express = require('express')
const courseController = require('../controller/Course.controller')

const routes = express.Router()

routes.get('/cursos', courseController.getCourses)
routes.get('/cursos/:id', courseController.getCourseByID)
routes.post('/cursos', courseController.addCourse)
routes.put('/cursos/edit/:id', courseController.editCourse)
routes.delete('/cursos/:id', courseController.deleteCourse)


module.exports = routes