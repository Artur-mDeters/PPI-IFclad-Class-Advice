const express = require('express');
const studentController = require('../controller/Student.controller');
const path = require("path");


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




// Rota para exibir as fotos
routes.get("/fotos/:nomeDaFoto", (req, res) => {
  const nomeDaFoto = req.params.nomeDaFoto;
  const caminhoDaFoto = path.join(__dirname, "..", "..", "fotos", nomeDaFoto);
  console.log("caminho: ", caminhoDaFoto);
  res.sendFile(caminhoDaFoto, (err) => {
    if (err) {
      console.error("Erro ao carregar a foto:", err);
      res.status(404).send("Foto não encontrada.");
    }
  });
});


// routes.get('/fotos/:nomeDaFoto', studentController.getStudentPhoto);
module.exports = routes;
