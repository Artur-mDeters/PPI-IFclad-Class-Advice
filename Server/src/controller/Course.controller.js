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
  const id_course = req.params.id;
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
  const { name, pattern, coordinator } = req.body;
  try {
    const id_course = uuidv4();
    const response = await db.query(
      "INSERT INTO curso (id_curso, nome, padrao, id_professor) values ($1, $2, $3, $4)", [id_course, name, pattern, coordinator]
    );
    res.status(201).send(response)
  } catch (err
  ) {
    res.status(500).send(err);
  }
  
};

exports.editCourse = async (req, res) => {
  const id_course = req.params.id; 
  const { name, pattern, coordenador } = req.body;

  try {
    const result = await db.query(
      "UPDATE curso SET nome = $1, padrao = $2, id_professor = $3 WHERE id_curso = $4",
      [name, pattern, coordenador, id_course]  
    );
    res.send(result.rows); 
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCourse = async (req, res) => {
  const id_course = req.params.id;

  try {
    // Exclui as associações de alunos com disciplinas nas turmas associadas ao curso
    await db.query(
      `DELETE FROM aluno_disciplina WHERE fk_aluno_id_aluno IN (SELECT id_aluno FROM aluno WHERE id_turma IN (SELECT id_turma FROM turma WHERE fk_curso_id_curso = $1))`,
      [id_course]
    );

    // Exclui os alunos das turmas associadas ao curso
    await db.query(
      `DELETE FROM aluno WHERE id_turma IN (SELECT id_turma FROM turma WHERE fk_curso_id_curso = $1)`,
      [id_course]
    );

    // Exclui as turmas associadas ao curso
    await db.query(
      `DELETE FROM turma WHERE fk_curso_id_curso = $1`,
      [id_course]
    );

    // Exclui o curso
    const result = await db.query("DELETE FROM curso WHERE id_curso = $1", [
      id_course,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(204).send(); // Sucesso
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erro interno
  }
};
