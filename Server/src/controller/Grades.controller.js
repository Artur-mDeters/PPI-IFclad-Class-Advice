const db = require("../db/db")

exports.getAllGradesBySubject = async function (req, res) {
    const { idDisciplina, idTurma } = req.params
    try {
        const result = await db.query(
            `SELECT 
            aluno_disciplina.fk_aluno_id_aluno,
            aluno.nome,
            aluno_disciplina.nota_final_nf,
            aluno_disciplina.nota_parcial_np,
            aluno_disciplina.faltas,
            aluno_disciplina.exame,
            aluno_disciplina.nota_segundo_sem,
            aluno_disciplina.nota_primeiro_sem
        FROM 
            aluno_disciplina
        JOIN 
            aluno ON aluno.id_aluno = aluno_disciplina.fk_aluno_id_aluno
        WHERE 
            aluno_disciplina.fk_disciplina_id_disciplina = $1
        AND
            aluno.id_turma = $2;`,
            [idDisciplina, idTurma]
        )

        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}