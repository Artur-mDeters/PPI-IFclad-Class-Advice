
const db = require("../db/db");  // Certifique-se de que o caminho para o arquivo está correto

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
    res.status(500).send({ message: "Erro ao buscar as notas.", error: error.message });
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
        mostra_de_ciencias
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
          idDisciplina
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
    const response = await db.query(
      `SELECT 
        n.nota_final_nf,
        a.nome as nome_aluno,
        a.id_aluno,
        n.pars_primeiro_sem,
        n.nota_primeiro_semestre_calculada,
        n.pars_segundo_sem,
        n.faltas,
        d.nome as disciplina
      FROM 
        aluno a 
      JOIN 
        aluno_disciplina n ON a.id_aluno = n.fk_aluno_id_aluno 
      JOIN 
        disciplina d ON n.fk_disciplina_id_disciplina = d.id_disciplina 
      JOIN 
        turma_disciplina td ON d.id_disciplina = td.fk_disciplina_id_disciplina
      WHERE
        td.fk_turma_id_turma = $1
      ORDER BY 
        a.nome;`,
      [idTurma]
    );

    // Verificando se há resultados
    if (!response.rows || response.rows.length === 0) {
      return res.status(404).json({ message: "Nenhuma nota encontrada." });
    }

    // Retornando os resultados
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Erro ao buscar as notas:", error);
    res.status(500).json({
      message: "Erro ao buscar as notas",
      error: error.message,
      idTurma: idTurma,
    });
  }
};
