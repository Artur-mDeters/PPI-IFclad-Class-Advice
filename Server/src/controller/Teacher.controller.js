
const db = require('../db/db')


const tipoUsuarioProfessor = 1

exports.getProfessores = async (req, res) => {
    try {
      const resposta = await db.query("SELECT * FROM usuario WHERE usuario_tipo = $1", [tipoUsuarioProfessor]);
      res.status(200).json(resposta);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erro ao buscar usuários", details: err.message });
    }
  };

  
exports.getProfessorById = async (req, res) => {
  const id_user = req.params.id
  try {
      const resposta = await db.query("SELECT * FROM usuario WHERE id_usuario = $1 AND usuario_tipo = $2", [id_user, tipoUsuarioProfessor])
      res.status(200).send(resposta)
  } catch (err) {
      res.status(404).send(err)
  }
}

