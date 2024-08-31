const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.addAluno = async (req, res) => {
  const { nome, matricula, email, sexo, nascimento, cidade, uf, interno , fk_turma_id_turma} =
    req.body;
  try {
    const id_aluno = uuidv4();
    const response = await db.query(
      "INSERT INTO aluno (id_aluno, nome, matricula, email, sexo, nascimento, cidade, uf, interno, id_turma) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [id_aluno, nome, matricula, email, sexo, nascimento, cidade, uf, interno, fk_turma_id_turma]
    );
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAlunos = async (req, res) => {
    const id = req.params.idTurma;  
    try {
        const response = await db.query("SELECT * FROM aluno WHERE id_turma = $1", id)
        res.status(200).json(response)   
    } catch(err) {
        res.status(500).send(err);
    }
}
exports.getAlunosById = async (req, res) => {
    // const idTurma = req.params.idTurma;
    const idAluno = req.params.idAluno;
    try {
        const response = await db.query("SELECT * FROM aluno WHERE id_aluno = $1 ", idAluno)
        res.status(200).json(response)   
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.updateAluno = async (req, res) => {
  const idAluno = req.params.idAluno;
  const { nome, matricula, email, sexo, nascimento, cidade, uf, interno } = req.body;

  try {
      const response = await db.query(
          `UPDATE aluno
          SET nome = $1, matricula = $2, email = $3, sexo = $4, nascimento = $5, cidade = $6, uf = $7, interno = $8
          WHERE id_aluno = $9
          RETURNING *`,
          [nome, matricula, email, sexo, nascimento, cidade, uf, interno, idAluno]
      );

      res.status(200).json(response);  // Retorna o aluno atualizado
  } catch (err) {
      console.error("Erro ao atualizar aluno:", err);  // Log do erro para depuração
      res.status(500).send("Erro interno do servidor");
  }
};

exports.excludeAluno = async (req, res) => {
  const idAluno = req.params.idAluno;
  try {
    await db.query(`DELETE FROM aluno WHERE id_aluno = $1`, [ idAluno ] )
    res.status(205).send("ok")
  } catch (err) {
    res.status(500).send("Erro interno do servidor ao tentar excluir aluno: ",err)
  }
}

