const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.getCursos = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM curso");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getCursoById = async (req, res) => {
  const { id_curso } = req.params.id;
  try {
    const response = await db.query("SELECT * FROM curso WHERE id_curso = $1", [
      id_curso,
    ]);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addCurso = async (req, res) => {
  const { nome} = req.body;
  try {
    const id_curso = uuidv4();
    const response = db.query(
      "INSERT INTO curso (id_curso, nome) values ($1, $2)", [id_curso, nome]
    );
    res.status(201).send(response)
  } catch (err
  ) {
    res.status(500).send(err);
  }
};
