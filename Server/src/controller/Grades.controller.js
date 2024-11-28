const db = require("../db/db");

exports.getAllGradesBySubject = async function (req, res) {
  const { idDisciplina, idTurma } = req.params;
  try {
    const result = await db.query(
      `SELECT 
            aluno_disciplina.fk_aluno_id_aluno,
            aluno.nome,
            aluno_disciplina.pars_primeiro_sem,
            aluno_disciplina.nota_primeiro_sem,
            aluno_disciplina.pars_segundo_sem,
            aluno_disciplina.nota_segundo_sem,
            aluno_disciplina.nota_ais,
            aluno_disciplina.nota_ppi,
            aluno_disciplina.nota_mostra_de_ciencias,
            aluno_disciplina.faltas,
            aluno_disciplina.nota_aia,
            aluno_disciplina.observation,
            aluno_disciplina.nota_final_nf
        FROM 
            aluno_disciplina
        JOIN 
            aluno ON aluno.id_aluno = aluno_disciplina.fk_aluno_id_aluno
        WHERE 
            aluno_disciplina.fk_disciplina_id_disciplina = $1
        AND
            aluno.id_turma = $2;`,
      [idDisciplina, idTurma]
    );

    res.status(200).json(result); // Acessa a propriedade 'rows' do resultado
  } catch (error) {
    res.status(500).send(error);
  }
};

// Função para adicionar ou atualizar as notas
exports.addGrades = async (req, res) => {
  const { idDisciplina } = req.params;
  const {
    idAluno,
    pars_primeiro_sem,
    nota_primeiro_sem,
    pars_segundo_sem,
    nota_segundo_sem,
    nota_ais,
    nota_ppi,
    faltas,
    nota_aia,
    nota_final_nf,
    observation,
    nota_mostra_de_ciencias
  } = req.body;

  // Validação básica
  if (!idDisciplina || !idAluno) {
    return res
      .status(400)
      .json({ message: "ID de aluno e disciplina são obrigatórios" });
  }

  try {
    // Atualiza as notas no banco de dados
    const result = await db.query(
      `UPDATE aluno_disciplina
        SET
            nota_final_nf = $1,
            nota_ppi = $2,
            faltas = $3,
            nota_aia = $4,
            pars_primeiro_sem = $5,
            pars_segundo_sem = $6,
            nota_segundo_sem = $7,
            nota_primeiro_sem = $8,
            observation = $9,
            nota_ais = $10,
            nota_mostra_de_ciencias = $11

        WHERE
            fk_aluno_id_aluno = $12
        AND
            fk_disciplina_id_disciplina = $13`,
      [
        nota_final_nf,
        nota_ppi,
        faltas,
        nota_aia,
        pars_primeiro_sem,
        pars_segundo_sem,
        nota_segundo_sem,
        nota_primeiro_sem,
        observation,
        nota_ais,
        nota_mostra_de_ciencias,
        idAluno,
        idDisciplina,
      ]
    );

    // Valida se algo foi atualizado
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum registro encontrado para atualizar" });
    }

    // Responde com sucesso
    res.status(200).json({ message: "Notas atualizadas com sucesso", result });
  } catch (error) {
    console.error("Erro ao atualizar as notas:", error);
    res
      .status(500)
      .json({ message: "Erro ao atualizar as notas", error: error.message });
  }
};
