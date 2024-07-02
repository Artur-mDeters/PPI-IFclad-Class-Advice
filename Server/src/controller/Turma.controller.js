//! create, read, update, delete
//? post  , get , put   , delete
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.getTurmas = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM turma");
    res.status(200).json(response);
  } catch (err) {
    console.error("GET TURMAS", err);
    res.status(500).send(err);
  }
};

exports.getTurmaById = async (req, res) => {
  const id_turma = req.params.id;
  try {
    const response = await db.query("SELECT * FROM turma WHERE id_turma = $1", [
      id_turma,
    ]);
    res.status(200).send(response);
  } catch (err) {
    console.error("GET TURMA BY ID", err);
    res.status(500).send(err);
  }
};

exports.addTurma = async (req, res) => {
  const { nome, ano_inicio, curso } = req.body; // curso: adm, info, agro
  try {
    const id_turma = uuidv4();

    // else {

    const response = await db.query(
      "INSERT INTO turma (id_turma, nome, ano_inicio, fk_curso_id_curso) VALUES ($1, $2, $3, $4)",
      [id_turma, nome, ano_inicio, curso]
    );
    res.status(200).json(response);

    // }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.editTurma = async (req, res) => {
  const id_turma = req.params.id;
  const { ano_inicio, nome, curso } = req.body;
  try {
    const result = await db.query(
      "UPDATE turma SET nome = $1, ano_inicio = $2, fk_curso_id_curso = $3 WHERE id_turma = $4 ",
      [nome, ano_inicio, curso ,id_turma ]
    );
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteTurma = async (req, res) => {
  const id_turma = req.params.id;
  try {
    await db.query("DELETE FROM turma WHERE id_turma = $1 ", [id_turma]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
};
