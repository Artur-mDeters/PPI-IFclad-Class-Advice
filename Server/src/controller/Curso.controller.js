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
  const { nome, padrao } = req.body;
  try {
    const id_curso = uuidv4();
    const response = await db.query(
      "INSERT INTO curso (id_curso, nome, padrao) values ($1, $2, $3)", [id_curso, nome, padrao]
    );
    res.status(201).send(response)
  } catch (err
  ) {
    res.status(500).send(err);
  }
  
};

exports.editCurso = async (req, res) => {
  const id_curso = req.params.id; // Corrigido para capturar diretamente req.params.id
  const { nome, padrao } = req.body;

  try {
    const result = await db.query(
      "UPDATE curso SET nome = $1, padrao = $2 WHERE id_curso = $3",
      [nome, padrao, id_curso]  
    );
    res.send(result.rows); // Para retornar apenas o curso atualizado
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCurso = async (req, res) => {
  const id_curso = req.params.id;
  try {
    await db.query("DELETE FROM curso WHERE id_curso = $1 ", [id_curso]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
}
