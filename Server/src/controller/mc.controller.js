const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.addMc = async (req, res) => {
    const {students, nome} = req.body;
    try {
        const id_mostra = uuidv4();
        const response = await db.query("INSERT INTO mostra_de_ciencias (id_mostra, nome) VALUES ($1, $2)", [id_mostra, nome])
        res.status(201).json(response)
    } catch (err) {
        throw new Error(err)
    }
}

exports.getMostra = async (req,res) => {
    try{    
        const response = await db.query('SELECT * FROM mostra_de_ciencias')
        res.status(200).json(response);
    } catch(err) {
        throw new  Error(err)
    }
}