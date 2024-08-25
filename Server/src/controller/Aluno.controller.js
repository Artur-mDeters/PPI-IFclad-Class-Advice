const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.addAluno = async (req, res) => {
  const { nome, matricula, email, sexo, nascimento, cidade, uf, interno } =
    req.body;
  try {
    const id_aluno = uuidv4();
    const response = await db.query(
      "INSERT INTO aluno (id_aluno, nome, matricula, email, sexo, nascimento, cidade, uf, interno) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [id_aluno, nome, matricula, email, sexo, nascimento, cidade, uf, interno]
    );
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
