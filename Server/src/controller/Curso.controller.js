const db = require('../db/db')

exports.getCursos = async (req, res) => {
    try {
        const response = db.query('SELECT * FROM curso')
        res.status(200).json(response)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getCursoById = async (req, res) => {
    const {id_curso} = req.params.id
}