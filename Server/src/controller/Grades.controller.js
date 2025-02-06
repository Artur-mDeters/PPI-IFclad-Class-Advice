const db = require("../db/db"); // Certifique-se de que o caminho para o arquivo está correto

exports.getAllGradesBySubject = async function (req, res) {
  const { idDisciplina, idTurma } = req.params;
  console.warn(idDisciplina, idTurma);

  try {
    // Executando a consulta SQL
    const result = await db.query(
      `SELECT 
            notas.*,
            aluno.nome
        FROM 
            notas
        JOIN 
            aluno ON aluno.id_aluno = notas.id_aluno
        WHERE 
            notas.fk_id_disciplina = $1
        AND
            aluno.id_turma = $2;`,
      [idDisciplina, idTurma]
    );
    console.log("Resultado da busca:", result);

    // Retornando os resultados
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    res
      .status(500)
      .send({ message: "Erro ao buscar as notas.", error: error.message });
  }
};

exports.addGrades = async (req, res) => {
  const { idDisciplina } = req.params;
  const grades = req.body.grades;

  try {
    for (let alunoId in grades) {
      const aluno = grades[alunoId];
      const {
        nota_final,
        ppi_b10,
        faltas,
        aia,
        parcial1,
        parcial2,
        semestre1,
        semestre2,
        observacao,
        ais_b10,
        mostra_de_ciencias,
      } = aluno;

      await db.query(
        `UPDATE notas
          SET
            nota_final = $1,
            ppi_b10 = $2,
            faltas = $3,
            aia = $4,
            parcial1 = $5,
            parcial2 = $6,
            semestre1 = $7,
            semestre2 = $8,
            observacao = $9,
            ais_b10 = $10,
            mostra_de_ciencias = $11
          WHERE
            id_aluno = $12
          AND
            fk_id_disciplina = $13`,
        [
          nota_final || null,
          ppi_b10 || null,
          faltas || null,
          aia || null,
          parcial1 || null,
          parcial2 || null,
          semestre1 || null,
          semestre2 || null,
          observacao || null,
          ais_b10 || null,
          mostra_de_ciencias || null,
          alunoId,
          idDisciplina,
        ]
      );
    }

    res.status(200).json({ message: "Notas atualizadas com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar as notas:", error);
    res.status(500).json({
      message: "Erro ao atualizar as notas",
      error: error.message,
    });
  }
};

exports.getGradesToPDF = async (req, res) => {
  const { idTurma } = req.params;

  try {
    const response = await db.query(`
  SELECT 
    notas.nota_final,
    aluno.nome AS nome,
    aluno.id_aluno,
    notas.parcial1,
    notas.semestre1,
    notas.parcial2,
    notas.semestre2,
    notas.faltas,
    notas.nota_final,
    disciplina.nome AS disciplina
  FROM 
    aluno 
  JOIN 
    notas ON aluno.id_aluno = notas.id_aluno 
  JOIN 
    disciplina ON notas.fk_id_disciplina = disciplina.id_disciplina 
  JOIN 
    turma_disciplina ON disciplina.id_disciplina = turma_disciplina.id_disciplina
  WHERE
    turma_disciplina.id_turma = $1
  ORDER BY 
    aluno.nome;
`, [idTurma]);

    // Verificando se há resultados
    // if (!response.rows || response.rows.length === 0) {
    //   return res.status(404).json({ message: "Nenhuma nota encontrada." });
    // }

    // Retornando os resultados
    console.log(response)
    res.status(200).json(response);
  } catch (error) {
    console.error("Erro ao buscar as notas:", error);
    res.status(500).json({
      message: "Erro ao buscar as notas",
      error: error.message,
      idTurma: idTurma,
    });
  }
};
