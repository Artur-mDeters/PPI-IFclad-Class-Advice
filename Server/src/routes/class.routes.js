const express = require('express')
const classController = require('../controller/Class.controller')

const routes = express.Router()


routes.post('/turmas', classController.addClass)
routes.get('/turmas/:id', classController.getClassByID)
routes.get('/turmas', classController.getClass)
routes.put('/turmas/editar/:id', classController.editClass)
routes.get('/turmas/editar/:id', classController.getClassByID)
routes.delete('/turmas/:id', classController.deleteClass)
routes.post('/turmas/conselho/:id', classController.AddClassCouncil)
routes.get('/turmas/disciplinas/:id', classController.getAllSubjectsOfClass)

module.exports = routes 
