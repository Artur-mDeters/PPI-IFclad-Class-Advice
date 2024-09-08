const db = require('../db/db');
const { v4: uuidv4 } = require("uuid");

exports.getSubjects = async (req, res) => {
    // Aqui você pode implementar a lógica para retornar as disciplinas
};

exports.addSubject = async (req, res) => {
    const { nome } = req.body;

    try {
        const id_disciplina = uuidv4();
        await db.query("INSERT INTO disciplina (id_disciplina, nome) values ($1, $2)", [id_disciplina, nome]);

        // Retorne a disciplina criada manualmente
        res.status(201).json({
            id_disciplina,
            nome,  // Usei a variável correta 'nome' aqui
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao adicionar a disciplina.");
    }
};
