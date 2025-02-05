const db = require('../db/db'); 
const { v4: uuidv4 } = require("uuid");
// const { trace } = require('../routes/subject.routes');

exports.getSubjects = async (_req, res) => {
    try {
        const response = await db.query("SELECT * FROM disciplina");
        res.status(200).json(response); // Usei `response.rows` para retornar apenas os dados
    } catch (err) {
        throw new Error("Erro ao encontrar disciplinas: " + err);
    }
};

exports.getSubjectById = async (req, res) => {
    const id = req.params.id
    try {
        const response = await db.query("SELECT * FROM disciplina WHERE id_disciplina = $1", id)
        res.status(200).json(response)
    } catch (err) {
        throw new Error("Erro ao buscar disciplina: ", err)
    }
}

exports.addSubject = async (req, res) => {
    const { nome } = req.body;

    try {
        const id_disciplina = uuidv4();
        await db.query("INSERT INTO disciplina (id_disciplina, nome) VALUES ($1, $2)", [id_disciplina, nome]);

        // Retorna a disciplina criada
        res.status(201).json({
            id_disciplina,
            nome, 
        });
    } catch (err) {
        throw new Error("Erro ao adicionar a disciplina: ", err);
    }
};

exports.editSubject = async (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;
    try {
        const response = await db.query(
            "UPDATE disciplina SET nome = $1 WHERE id_disciplina = $2",
            [nome, id]
        );

        if (response.rowCount === 0) {
            return res.status(404).send("Disciplina não encontrada");
        }

        res.status(200).json({
            id,
            nome,
        });
    } catch (err) {
        throw new Error("Erro ao editar a disciplina: ", err);
    }
};

exports.excludeSubject = async (req, res) => {
    const id = req.params.id;
    try {
        // Primeiro, excluímos os registros na tabela aluno_disciplina relacionados à disciplina
        await db.query(
            "DELETE FROM notas WHERE fk_id_disciplina = $1", [id]
        );

        // Depois, excluímos a disciplina na tabela disciplina
        await db.query(
            "DELETE FROM disciplina WHERE id_disciplina = $1", [id]
        );

        res.status(200).send("Disciplina excluída com sucesso e registros associados removidos!");
    } catch (error) {
        throw new Error('Erro ao excluir disciplina e registros associados: ', error);
    }
};

exports.getNameAndIDFromAllSubjects = async (req, res) => {
    try {
        const response = await db.query("SELECT  id_disciplina, nome FROM disciplina") 
        
        if (response.rowCount === 0) {
            return res.status(404).send("Disciplina não encontrada");
        }
        
        res.status(200).json(response)
    } catch (err) {
        throw new Error("Erro ao ler os valores 'nome' e 'id_disciplina' da tabela disciplina", err)
    }    
}