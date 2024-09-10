const generator = require("generate-password");
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

exports.addSector = async (req, res) => {
  const { email, name } = req.body;
  const type = 3;

  try {
    const id_usuario = uuidv4(); // Gera um UUID válido    
    const password = generator.generate({
      length: 7,
      numbers: true,
    });

    await db.query(
      "INSERT INTO usuario (email, senha, nome, usuario_tipo, id_usuario) VALUES ($1, $2, $3, $4, $5)",
      [email, password, name, type, id_usuario]
    );

    res.status(201).send("setor cadastrado com sucesso!")
  } catch (error) {
    res.status(500).send("Erro ao adicionar um novo setor: ", error)
  }
};
