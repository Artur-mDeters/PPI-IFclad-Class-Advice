// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

// Função para login
const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificando se o usuário existe
    const user = await db.oneOrNone("SELECT * FROM usuario WHERE email = $1", [email]);

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    // Comparando a senha
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    // Gerando o token JWT
    const payload = { id: user.id_usuario, nome: user.nome, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Autenticação bem-sucedida", token });
  } catch (err) {
    console.error("Erro ao tentar autenticar o usuário", err);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

// Função para proteger a rota com token JWT
const profile = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token de autenticação não fornecido." });
  }

  try {
    // Verificando e decodificando o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Recuperando os dados do usuário do banco de dados
    const user = await db.one("SELECT * FROM usuario WHERE id_usuario = $1", [decoded.id]);
    res.json(user);
  } catch (err) {
    console.error("Erro ao verificar o token", err);
    res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = {
  login,
  profile,
};
