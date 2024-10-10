
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.getClass = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM turma");
    res.status(200).json(response);
  } catch (err) {
    console.error("GET TURMAS", err);
    res.status(500).send(err);
  }
};

exports.getClassByID = async (req, res) => {
  const id_class = req.params.id;
  try {
    const response = await db.query("SELECT * FROM turma WHERE id_turma = $1", [
      id_class,
    ]);
    res.status(200).send(response);
  } catch (err) {
    console.error("GET TURMA BY ID", err);
    res.status(500).send(err);
  }
};

exports.addClass = async (req, res) => {
  const { name, start_year, course } = req.body; 
  try {
    const id_class = uuidv4();

    const response = await db.query(
      "INSERT INTO turma (id_turma, nome, ano_inicio, fk_curso_id_curso) VALUES ($1, $2, $3, $4)",
      [id_class, name, start_year, course]
    );
    res.status(200).json(response);

  } catch (err) {
    res.status(500).send(err);
  }
};

exports.editClass = async (req, res) => {
  const id_class = req.params.id;
  const { start_year, name, id_course } = req.body;
  try {
    const result = await db.query(
      "UPDATE turma SET nome = $1, ano_inicio = $2, fk_curso_id_curso = $3 WHERE id_turma = $4 ",
      [name, start_year, id_course ,id_class ]
    );
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteClass = async (req, res) => {
  const id_class = req.params.id;
  try {
    await db.query("DELETE FROM turma WHERE id_turma = $1 ", [id_class]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
};
