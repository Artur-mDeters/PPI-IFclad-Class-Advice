const express = require('express');
const studentController = require('../controller/Student.controller');

const routes = express.Router();

// Adiciona um novo aluno
routes.post('/alunos', studentController.addStudent);

// Obtém todos os alunos de uma turma (se necessário)
routes.get('/:idTurma/alunos', studentController.getStudent);

// Obtém um aluno específico pelo ID
routes.get('/alunos/:idStudent', studentController.getStudentByID);

// Atualiza um aluno específico pelo ID
routes.put('/alunos/:idStudent', studentController.updateStudent);

// Exclui um aluno específico pelo ID
routes.delete('/alunos/:idStudent', studentController.excludeStudent);

routes.get('/todosOsAlunos/:idTurma', studentController.getStudentsByClass);
module.exports = routes;
