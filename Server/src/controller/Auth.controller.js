const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const templates = require("../../emails/templates.email");




// Example usage
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("email:", email);
    console.log("password:", password);

  try {
    const response = await db.query(`SELECT * FROM usuario WHERE email = $1`, [
      email,
    ]);
    const user = response[0]; // Acesse o primeiro usuário retornado

    if (!user) {
      return res.status(401).send({ message: "Email ou senha inválidos" });
    }

    console.log("resposta do banco:", user);

    const isPasswordValid = bcrypt.compareSync(password, user.senha);
    console.log(isPasswordValid);

    if (isPasswordValid) {
      const token = jwt.sign(
        { id: user.id_usuario, role: user.usuario_tipo },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h", // 24 hours
        }
      );
      res
        .status(200)
        .send({ auth: true, token: token, role: user.usuario_tipo });
    } else {
      res.status(401).send({ message: "Email ou senha inválidos" });
    }
  } catch (err) {
    console.error("Erro durante o login:", err);
    res.status(500).send({ message: "Erro interno do servidor" });
  }
};

exports.recoveryPassword = async (req, res) => {
  const { password, id_usuario} = req.body;


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('UPDATE usuario SET senha = $1 WHERE id_usuario = $2', [hashedPassword, id_usuario.id])
    res.status(200).send({ message: "Senha alterada com sucesso" });
  } catch (err) {
    console.error("Erro ao alterar a senha:", err);
    res.status(500).send({ message: "Erro interno do servidor" });
  }
};
