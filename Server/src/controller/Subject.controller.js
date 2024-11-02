const db = require('../db/db');
const { v4: uuidv4 } = require("uuid");
const { trace } = require('../routes/subject.routes');

exports.getSubjects = async (_req, res) => {
    try {
        const response = await db.query("SELECT * FROM disciplina");
        res.status(200).json(response); // Usei `response.rows` para retornar apenas os dados
    } catch (error) {
        res.status(500).send("Erro ao encontrar disciplinas: " + error);
    }
};

exports.getSubjectById = async (req, res) => {
    const id = req.params.id
    try {
        const response = await db.query("SELECT * FROM disciplina WHERE id_disciplina = $1", id)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send(error)
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
        console.error(err);
        res.status(500).send("Erro ao adicionar a disciplina: " + err);
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
    } catch (error) {
        res.status(500).send("Erro ao editar a disciplina: " + error);
    }
};

exports.excludeSubject = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query(
            "DELETE FROM disciplina WHERE id_disciplina = $1", [id]
        )
        res.status(200).send("disciplina excluída com sucesso!")
    } catch (error) {
        res.status(500).send('Erro ao excluir disciplina!')
    }
}

exports.getNameAndIDFromAllSubjects = async (req, res) => {
    try {
        const response = await db.query("SELECT  id_disciplina, nome FROM disciplina") 
        
        if (response.rowCount === 0) {
            return res.status(404).send("Disciplina não encontrada");
        }
        
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send("Erro ao ler os valores 'nome' e 'id_disciplina' da tabela disciplina")
    }    
}