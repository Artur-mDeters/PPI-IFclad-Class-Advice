const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const templates = require("../../emails/templates.email");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arturdamotta@gmail.com",
      pass: "xwge rpem fwpy dpja"
    }
  });
  
  async function sendEmail() {
    try {
      const info = await transporter.sendMail({
        from: '"Seu Nome" <seuemail@gmail.com>',
        to: "artur.2021301162@aluno.iffar.edu.br",
        subject: "DEU CERTO ESTA PORRA",
        text: "Este é um teste de e-mail usando Nodemailer!",
        html: templates.welcomeEmail("Artur")
      });
  
      console.log("Email enviado:", info.response);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  }
  
  sendEmail();

// Example usage
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("email:", email);
    console.log("password:", password);

    sendEmail('welcome', { name: 'Artur' });

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
