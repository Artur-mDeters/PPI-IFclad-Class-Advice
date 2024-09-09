const express = require('express');
const subjectController = require('../controller/Subject.controller')

const routes = express.Router();

routes.post('/disciplina', subjectController.addSubject)
routes.get('/disciplina', subjectController.getSubjects)

module.exports = routes