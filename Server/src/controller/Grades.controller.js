
const db = require("../db/db");  // Certifique-se de que o caminho para o arquivo está correto

exports.getAllGradesBySubject = async function (req, res) {
  const { idDisciplina, idTurma } = req.params;
  console.warn(idDisciplina, idTurma);

  try {
    // Executando a consulta SQL
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

    // Adicionando um log para inspecionar o conteúdo de `result`
    console.log(result);

    // Verificando se result e result.rows existem antes de acessar `length`
      res.status(200).json(result);
    
  } catch (error) {
    // Em caso de erro, registra o erro no console e retorna status 500
    console.error("Erro ao buscar notas:", error);
    res.status(500).send({ message: "Erro ao buscar as notas.", error: error.message });
  }
};


exports.addGrades = async (req, res) => {
  const { idDisciplina } = req.params;
  const grades = req.body.grades;

  console.log("Grades recebidas:", grades); // Logando as notas recebidas

  if (!grades || typeof grades !== 'object') {
    return res.status(400).json({ message: "Grades inválidas fornecidas." });
  }

  const gradesArray = Object.values(grades);

  // Definindo os pesos de cada componente
  const peso_primeiro_sem = 0.2;
  const peso_segundo_sem = 0.5;
  const peso_ais = 0.2;
  const peso_ppi = 0.2;
  const peso_aia = 0.4;
  const peso_mostra_de_ciencias = 0.1;

  try {
    for (let i = 0; i < gradesArray.length; i++) {
      const aluno = gradesArray[i];

      // Cálculo da nota do primeiro semestre
      const nota_primeiro_semestre_calculada =
        aluno.pars_primeiro_sem * peso_primeiro_sem +
        aluno.nota_primeiro_sem * peso_primeiro_sem;

      // Cálculo da nota final
      const nota_final_nf = (
        aluno.pars_primeiro_sem * peso_primeiro_sem +
        aluno.nota_primeiro_sem * peso_primeiro_sem +
        aluno.pars_segundo_sem * peso_segundo_sem +
        aluno.nota_segundo_sem * peso_segundo_sem +
        aluno.nota_ais * peso_ais +
        aluno.nota_ppi * peso_ppi +
        aluno.nota_aia * peso_aia +
        aluno.nota_mostra_de_ciencias * peso_mostra_de_ciencias
      ).toFixed(2); 

      // Logando as notas antes de atualizar no banco
      console.log("Notas para o aluno:", aluno);

      // Atualização das notas no banco de dados
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
              nota_mostra_de_ciencias = $11,
              nota_primeiro_semestre_calculada = $12
              fk_aluno_id_aluno = $13
          WHERE
              fk_aluno_id_aluno = $13
          AND
              fk_disciplina_id_disciplina = $14`,
        [
          nota_final_nf,
          aluno.nota_ppi,
          aluno.faltas,
          aluno.nota_aia,
          aluno.pars_primeiro_sem,
          aluno.pars_segundo_sem,
          aluno.nota_segundo_sem,
          aluno.nota_primeiro_sem,
          aluno.observation,
          aluno.nota_ais,
          aluno.nota_mostra_de_ciencias,
          nota_primeiro_semestre_calculada,  // Atualizando o campo calculado
          aluno.fk_aluno_id_aluno,
          idDisciplina,
        ]
      );

      // Verificando se o aluno foi encontrado e atualizado
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum registro encontrado para atualizar" });
      }
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
        a.nome;
`,
      [idTurma]
    );
    
    console.log("Resposta da consulta ao banco: ", response);
    
    
    
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
