const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
  try {
    const saltsRounds = 10 // número de saltos para aumentar a segurança do hash 
    const hashedPassword = await bcrypt.hash(password, saltsRounds)
    return hashedPassword 
  } catch (err) {
    throw new Error('Erro ao criar um hash da senha', err)
  }
}

exports.getUsers = async (req, res) => {
  try {
    const resposta = await db.query("SELECT * FROM usuario");
    res.status(200).json(resposta);
  } catch (err) {
    throw new Error("Erro ao buscar usuários",err);
  }
};

exports.addUser = async (req, res) => {
  const { email, password, name, type, siape } = req.body;
  console.log(req.files)
  try {
    const id_usuario = uuidv4();
    const hashedPassword = await hashPassword(password)
    await db.query(
      "INSERT INTO usuario (email, senha, nome, siape, usuario_tipo, id_usuario) VALUES ($1, $2, $3, $4, $5, $6)",
      [email, hashedPassword, name, siape, type, id_usuario]
    );
    res.status(200).send("Usuário registrado com sucesso");
  } catch (err) {
    throw new Error("Erro ao registrar o usuário", err);
  }
};

exports.getUserById = async (req, res) => {
  const id_user = req.params.id
  try {
    const resposta = await db.query("SELECT * FROM usuario WHERE id_usuario = $1", [id_user])
    res.status(200).send(resposta)
  } catch (err) {
    throw new Error("Erro ao buscar usuario: ", err)
  }
}

exports.deleteUser = async (req, res) => {
  const id_user = req.params.id
  try {
    await db.query('DELETE FROM usuario WHERE id_usuario = $1', [id_user])
    res.status(204).send()
  } catch (err) {
    throw new Error("Erro ao deletar usuario: ", err)
  }

}

