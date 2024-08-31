const express = require('express');
const alunoController = require('../controller/Aluno.controller');

const routes = express.Router();

// Adiciona um novo aluno
routes.post('/alunos', alunoController.addAluno);

// Obtém todos os alunos de uma turma (se necessário)
routes.get('/:idTurma/alunos', alunoController.getAlunos);

// Obtém um aluno específico pelo ID
routes.get('/alunos/:idAluno', alunoController.getAlunosById);

// Atualiza um aluno específico pelo ID
routes.put('/alunos/:idAluno', alunoController.updateAluno);

// Exclui um aluno específico pelo ID
routes.delete('/alunos/:idAluno', alunoController.excludeAluno);

module.exports = routes;
