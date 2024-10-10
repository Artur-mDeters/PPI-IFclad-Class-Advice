const generator = require("generate-password");
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const TYPE_SECTOR = 3; // Definido como uma constante para maior clareza

// Obter todos os setores
exports.getSectors = async (req, res) => {
  try {
    const response = await db.query(
      "SELECT * FROM usuario WHERE usuario_tipo = $1",
      [TYPE_SECTOR]
    );
    res.status(200).json(response); // Usar .rows para obter os dados
  } catch (error) {
    console.error("Erro ao ler dados dos setores:", error);
    res.status(500).send("Erro ao ler dados dos setores");
  }
};

// Atualizar setor
exports.editSectors = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Nome do setor é necessário");
  }
  try {
    await db.query("UPDATE usuario SET nome = $1 WHERE id_usuario = $2", [
      name,
      id,
    ]);

    res.status(200).send("Setor atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar setor:", error);
    res.status(500).send("Erro ao atualizar setor");
  }
};

// Excluir setor
exports.excludeSectors = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
    res.status(200).send("Setor excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir setor:", error);
    res.status(500).send("Erro ao excluir setor");
  }
};

// Obter setor por ID
exports.getSectorsByID = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.query(
      "SELECT * FROM usuario WHERE id_usuario = $1",
      [id]
    );
    res.status(200).json(response); // Retorna o primeiro resultado
  } catch (error) {
    console.error("Erro ao ler setor pelo ID:", error);
    res.status(500).send("Erro ao ler setor pelo ID");
  }
};

// Adicionar setor
exports.addSector = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).send("Email e nome do setor são necessários");
  }

  try {
    const id_usuario = uuidv4(); // Gera um UUID válido
    const password = generator.generate({
      length: 7,
      numbers: true,
    });

    await db.query(
      "INSERT INTO usuario (email, senha, nome, usuario_tipo, id_usuario) VALUES ($1, $2, $3, $4, $5)",
      [email, password, name, TYPE_SECTOR, id_usuario]
    );

    res.status(201).send("Setor cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar um novo setor:", error);
    res.status(500).send("Erro ao adicionar um novo setor");
  }
};
