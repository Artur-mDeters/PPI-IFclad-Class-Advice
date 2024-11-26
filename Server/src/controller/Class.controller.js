
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.getClass = async (___, res) => {
  try {
    const response = await db.query("SELECT * FROM turma");
    res.status(200).json(response);
  } catch (err) {
    throw new Error(err);
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

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(result);

  } catch (err) {
    
    throw new Error(err);
    res.status(500).json(err);
  }
};


// ! Exemplo de requisição para excluir uma turma (usar ela como padrão para todas as outras)
exports.deleteClass = async (req, res) => {
  const id_class = req.params.id;

  try {
    // Exclui as associações de alunos com disciplinas na tabela aluno_disciplina
    await db.query(
      `DELETE FROM aluno_disciplina WHERE fk_aluno_id_aluno IN (SELECT id_aluno FROM aluno WHERE id_turma = $1)`,
      [id_class]
    );

    // Exclui os alunos associados à turma
    await db.query(
      `DELETE FROM aluno WHERE id_turma = $1`,
      [id_class]
    );

    // Exclui a turma
    const result = await db.query("DELETE FROM turma WHERE id_turma = $1", [id_class]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(204).send(); // Sucesso
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erro interno
  }
};

exports.AddClassCouncil = async (req, res) => {
  const id_class = req.params.id; // ID da turma vindo dos parâmetros
  const { conselho } = req.body; // Data do conselho vindo no corpo da requisição

  try {
    const result = await db.query(
      "UPDATE turma SET conselho = $1 WHERE id_turma = $2",
      [conselho, id_class]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class council scheduled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
