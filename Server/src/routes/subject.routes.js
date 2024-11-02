const express = require('express');
const subjectController = require('../controller/Subject.controller')

const routes = express.Router();

routes.get('/disciplina', subjectController.getSubjects)
routes.get('/disciplina/:id', subjectController.getSubjectById)
// pegar os valores de nome e id da tabela
routes.post('/disciplina', subjectController.addSubject)
routes.put('/disciplina/:id', subjectController.editSubject)
routes.delete('/disciplina/:id', subjectController.excludeSubject)
routes.get('/todasAsDisciplinas', subjectController.getNameAndIDFromAllSubjects)

module.exports = routes

