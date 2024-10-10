const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.addStudent = async (req, res) => {
  const { name, registration, email, gender, dateOfBirth, city, federativeUnity, internal , course} =
    req.body;
  try {
    const id_student = uuidv4();
    const response = await db.query(
      "INSERT INTO aluno (id_aluno, nome, matricula, email, sexo, nascimento, cidade, uf, interno, id_turma) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [id_student, name, registration, email, gender, dateOfBirth, city, federativeUnity, internal, course]
    );
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getStudent = async (req, res) => {
    const id = req.params.idTurma;  
    try {
        const response = await db.query("SELECT * FROM aluno WHERE id_turma = $1", id)
        res.status(200).json(response)   
    } catch(err) {
        res.status(500).send(err);
    }
}
exports.getStudentByID = async (req, res) => {
    // const idTurma = req.params.idTurma;
    const idStudent = req.params.idStudent;
    try {
        const response = await db.query("SELECT * FROM aluno WHERE id_aluno = $1 ", idStudent)
        res.status(200).json(response)   
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.updateStudent = async (req, res) => {
  const id_student = req.params.idStudent;
  const { name, registration, email, gender, dateOfBirth, city, federativeUnity, internal } = req.body;

  try {
      const response = await db.query(
          `UPDATE aluno
          SET nome = $1, matricula = $2, email = $3, sexo = $4, nascimento = $5, cidade = $6, uf = $7, interno = $8
          WHERE id_aluno = $9
          RETURNING *`,
          [name, registration, email, gender, dateOfBirth, city, federativeUnity, internal, id_student]
      );

      res.status(200).json(response);  
  } catch (err) {
      console.error("Erro ao atualizar aluno:", err); 
      res.status(500).send("Erro interno do servidor");
  }
};

exports.excludeStudent = async (req, res) => {
  const idStudent = req.params.idStudent;
  try {
    await db.query(`DELETE FROM aluno WHERE id_aluno = $1`, [ idStudent ] )
    res.status(205).send("ok")
  } catch (err) {
    res.status(500).send("Erro interno do servidor ao tentar excluir aluno: ",err)
  }
}

