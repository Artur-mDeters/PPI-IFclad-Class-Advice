const db = require("../db/db");

exports.getAllForApresentation = async (req, res) => {
  const studentId = req.params.id;
  try {
    const response = await db.query(
      `
          SELECT 
    aluno.id_aluno,
    aluno.nome,
    aluno.matricula,
    aluno.foto_path,
    aluno.interno,
    notas.faltas,
    notas.parcial1,
    notas.semestre1,
    notas.parcial2,
    notas.semestre2,
    notas.ppi_b10,
    notas.ais_b10,
    notas.mostra_de_ciencias,
    notas.nota_final,
    notas.observacao,
    aluno.cidade,
    aluno.uf,
    aluno.reprovou,
    aluno.genero,
    aluno.nascimento,
    disciplina.nome as nome_disciplina,
    disciplina.id_disciplina,
    turma.nome as nome_turma,
    curso.nome as nome_curso
FROM 
    aluno
INNER JOIN 
    notas ON aluno.id_aluno = notas.id_aluno
INNER JOIN 
    disciplina ON notas.fk_id_disciplina = disciplina.id_disciplina
INNER JOIN 
    turma ON aluno.id_turma = turma.id_turma
INNER JOIN 
    curso ON turma.id_curso = curso.id_curso
WHERE 
    aluno.id_aluno = $1
ORDER BY 
    aluno.nome, disciplina.nome
        `,
      [studentId]
    );
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Erro ao buscar dados do aluno:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message,
    });
  }
};

// Buscar dados de múltiplos alunos de uma vez
exports.getAllStudentsForApresentation = async (req, res) => {
  const { studentIds } = req.body; // Espera receber um array de IDs

  try {
    const response = await db.query(
      `
            SELECT 
    aluno.id_aluno,
    aluno.nome,
    aluno.matricula,
    aluno.foto_path,
    aluno.interno,
    aluno.faltas,
    notas.nota_1,
    notas.nota_2,
    notas.nota_3,
    notas.nota_4,
    notas.media,
    disciplina.nome as nome_disciplina,
    disciplina.id_disciplina,
    turma.nome as nome_turma,
    curso.nome as nome_curso
FROM 
    aluno
INNER JOIN 
    notas ON aluno.id_aluno = notas.fk_id_aluno
INNER JOIN 
    disciplina ON notas.fk_id_disciplina = disciplina.id_disciplina
INNER JOIN 
    turma ON aluno.fk_id_turma = turma.id_turma
INNER JOIN 
    curso ON turma.fk_id_curso = curso.id_curso
WHERE 
    aluno.id_aluno = ANY($1::uuid[])
ORDER BY 
    aluno.nome, disciplina.nome
        `,
      [studentIds]
    );

    // Organizar os dados agrupando por aluno
    const studentsMap = new Map();

    response.forEach((row) => {
      if (!studentsMap.has(row.id_aluno)) {
        studentsMap.set(row.id_aluno, {
          id_aluno: row.id_aluno,
          nome: row.nome,
          matricula: row.matricula,
          foto_path: row.foto_path,
          turma: row.turma,

          grades: [],
        });
      }

      studentsMap.get(row.id_aluno).grades.push({
        id_disciplina: row.id_disciplina,
        nome_disciplina: row.nome_disciplina,
        nota_1: row.nota_1,
        nota_2: row.nota_2,
        nota_3: row.nota_3,
        nota_4: row.nota_4,
        media: row.media,
      });
    });

    const students = Array.from(studentsMap.values());
    res.status(200).json(students);
  } catch (error) {
    console.error("Erro ao buscar dados dos alunos:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
