//! create, read, update, delete
//? post  , get , put   , delete
const db = require('../db/db')
const { v4: uuidv4 } = require("uuid")

exports.getTurmas = async (req, res) => {
    try {
        const response = db.query("SELECT * FROM turma")
        res.status(200).json(response)
    } catch (err) {
        console.error('GET TURMAS', err)
        res.status(500).send(err)
    }
}

exports.getTurmaById = async (req, res) => {
    const { id_turma } = req.params.id
    try {
        const response = db.query("SELECT * FROM turma WHERE id_turma = $1", [id_turma])
        res.status(200).json(response)
    } catch (err) {
        console.error("GET TURMA BY ID", err)
        res.status(500).send(err)
    }
}

exports.addTurma = async (req, res) => {
    const { nome, ano_inicio, curso } = req.body // curso: adm, info, agro
    try {
        const id_turma = uuidv4()
        const fk_curso_id_curso = await db.query('SELECT id_curso WHERE nome = $1', [curso] )
        if (String(fk_curso_id_curso).length < 0) {
            console.error('Este curso não existe')
            res.status(404)
        } else {
            const response = await db.query('INSERT INTO turma (id_turma, nome, ano_inicio, fk_curso_id_curso) VALUES ($1, $2, $3, $4)', 
                [id_turma, nome, ano_inicio, fk_curso_id_curso])
            res.status(200).json(response)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}


