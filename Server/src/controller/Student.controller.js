const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.addStudent = async (req, res) => {
  const {
    name,
    registration,
    email,
    gender,
    dateOfBirth,
    city,
    federativeUnity,
    internal,
    course,
  } = req.body;

  // Verificação de preenchimento dos campos
  // if (![name, registration, email, gender, dateOfBirth, city, federativeUnity, internal, classe].every(Boolean)) {
  //   return res.status(400).send("Todos os campos devem ser preenchidos.");
  // }

  try {
    const id_student = uuidv4();

    // Inserção do aluno no banco de dados
    const response = await db.query(
      "INSERT INTO aluno (id_aluno, nome, matricula, email, genero, nascimento, cidade, uf, interno, id_turma) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        id_student,
        name,
        registration,
        email,
        gender,
        dateOfBirth,
        city,
        federativeUnity,
        internal,
        course,
      ]
    );

    // Consulta das disciplinas
    const subjects = await db.any("SELECT id_disciplina FROM disciplina");

    // Preparação dos valores para inserção em lote
    const notesValues = subjects
      .map(({ id_disciplina }) => {
        const id_notas = uuidv4();
        return `('${id_notas}', '${id_student}', '${id_disciplina}')`;
      })
      .join(", ");

    if (notesValues) {
      await db.query(
        `INSERT INTO notas (id_notas, id_aluno, fk_id_disciplina) VALUES ${notesValues}`
      );
    }

    res.status(201).send({ message: "Aluno e notas inseridos com sucesso." });
  } catch (err) {
    res.status(500).send({ error: "Erro ao inserir aluno.", details: err });
  }
};

exports.getStudent = async (req, res) => {
  const id = req.params.idTurma;
  try {
    const response = await db.query(
      "SELECT * FROM aluno WHERE id_turma = $1",
      id
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.getStudentByID = async (req, res) => {
  // const idTurma = req.params.idTurma;
  const idStudent = req.params.idStudent;
  try {
    const response = await db.query(
      "SELECT * FROM aluno WHERE id_aluno = $1 ",
      idStudent
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateStudent = async (req, res) => {
  const id_student = req.params.idStudent;
  const {
    name,
    registration,
    email,
    gender,
    dateOfBirth,
    city,
    federativeUnity,
    internal,
  } = req.body;

  try {
    const response = await db.query(
      `UPDATE aluno
          SET nome = $1, matricula = $2, email = $3, genero = $4, nascimento = $5, cidade = $6, uf = $7, interno = $8
          WHERE id_aluno = $9
          RETURNING *`,
      [
        name,
        registration,
        email,
        gender,
        dateOfBirth,
        city,
        federativeUnity,
        internal,
        id_student,
      ]
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
    // Primeiro, excluímos as associações na tabela aluno_disciplina
    await db.query(
      `DELETE FROM aluno_disciplina WHERE fk_aluno_id_aluno = $1`,
      [idStudent]
    );

    // Em seguida, excluímos o aluno da tabela aluno
    await db.query(`DELETE FROM aluno WHERE id_aluno = $1`, [idStudent]);

    res
      .status(205)
      .send("Aluno e registros relacionados excluídos com sucesso.");
  } catch (err) {
    console.error("Erro ao excluir aluno:", err);
    res.status(500).send("Erro interno do servidor ao tentar excluir aluno.");
  }
};

exports.getStudentsByClass = async (req, res) => {
  const turma = req.params.idTurma;
  try {
    const response = await db.query(
      "SELECT * FROM aluno WHERE id_turma = $1",
      turma
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
