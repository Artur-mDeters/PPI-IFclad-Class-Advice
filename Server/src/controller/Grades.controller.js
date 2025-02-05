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
    throw new Error("Erro ao buscar notas: " + error);
  }
};

exports.addGrades = async (req, res) => {
  const { idDisciplina } = req.params;
  const grades = req.body.grades;

  console.log("Grades recebidas:", grades); // Logando as notas recebidas

  const gradesArray = Object.values(grades);

  try {
    for (let i = 0; i < gradesArray.length; i++) {
      const aluno = gradesArray[i];
      const { nota_final } = aluno; // Obtendo o valor de nota_final de cada aluno

      console.log("Parametros SQL:", [
        nota_final,
        aluno.ppi_b10,
        aluno.faltas,
        aluno.aia,
        aluno.parcial1,
        aluno.parcial2,
        aluno.semestre1,
        aluno.semestre2,
        aluno.observacao,
        aluno.ais_b10,
        aluno.mostra_de_ciencias,
        aluno.id_aluno,
        idDisciplina
      ]);
      
      // Atualização das notas no banco de dados
      const result = await db.query(
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
          aluno.ppi_b10 || null,
          aluno.faltas,
          aluno.aia,
          aluno.parcial1,
          aluno.parcial2,
          aluno.semestre1,
          aluno.semestre2,
          aluno.observacao,
          aluno.ais_b10,
          aluno.mostra_de_ciencias,
          aluno.id_aluno,
          idDisciplina
        ]
      );

      // Verificando se o aluno foi encontrado e atualizado
      if (result.rowCount === 0) {
        return res.status(404).json({ message: `Aluno ${aluno.id_aluno} não encontrado.` });
      }
    }

    res.status(200).json({ message: "Notas atualizadas com sucesso!" });
  } catch (error) {
    throw new Error("Erro ao atualizar as notas: " + error);
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
    throw new Error("Erro ao buscar as notas: " + error);
  }
};
