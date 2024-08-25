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
    const id = req.params.id;  
    try {
        const response = await db.query("SELECT * FROM aluno WHERE id_turma = $1", id)
        res.status(200).json(response)   
    } catch(err) {
        res.status(500).send(err);
    }
}