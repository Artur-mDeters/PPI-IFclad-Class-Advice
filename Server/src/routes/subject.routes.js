const express = require('express');
const subjectController = require('../controller/Subject.controller')

const routes = express.Router();

routes.get('/disciplina', subjectController.getSubjects)
routes.get('/disciplina/:id', subjectController.getSubjectById)
routes.post('/disciplina', subjectController.addSubject)
routes.put('/disciplina/:id', subjectController.editSubject)
routes.delete('/disciplina/:id', subjectController.excludeSubject)

module.exports = routes