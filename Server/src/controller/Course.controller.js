const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.getCourses = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM curso");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getCourseByID = async (req, res) => {
  const { id_course } = req.params.id;
  try {
    const response = await db.query("SELECT * FROM curso WHERE id_curso = $1", [
      id_course,
    ]);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
 
exports.addCourse = async (req, res) => {
  const { name, pattern } = req.body;
  try {
    const id_course = uuidv4();
    const response = await db.query(
      "INSERT INTO curso (id_curso, nome, padrao) values ($1, $2, $3)", [id_course, name, pattern]
    );
    res.status(201).send(response)
  } catch (err
  ) {
    res.status(500).send(err);
  }
  
};

exports.editCourse = async (req, res) => {
  const id_course = req.params.id; 
  const { name, pattern } = req.body;

  try {
    const result = await db.query(
      "UPDATE curso SET nome = $1, padrao = $2 WHERE id_curso = $3",
      [name, pattern, id_course]  
    );
    res.send(result.rows); 
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCourse = async (req, res) => {
  const id_course = req.params.id;
  try {
    await db.query("DELETE FROM curso WHERE id_curso = $1 ", [id_course]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
}
