const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const templates = require('../../emails/templates.email');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arturdamotta@gmail.com',
    pass: '@inj3u6nA26300802'
  }
});

function sendEmail(type, data) {
  let subject = '';
  let htmlContent = '';

  switch (type) {
    case 'welcome':
      subject = '🎉 Bem-vindo!';
      htmlContent = templates.welcomeEmail(data.name);
      break;
    case 'reset':
      subject = '🔑 Redefinição de Senha';
      htmlContent = templates.passwordResetEmail(data.resetLink);
      break;
    case 'notification':
      subject = '📢 Nova Notificação';
      htmlContent = templates.notificationEmail(data.message);
      break;
    default:
      console.log('Tipo de e-mail inválido.');
      return;
  }

  const mailOptions = {
    from: 'arturdamotta@gmai.com',
    to: 'artur.2021301162@aluno.iffar.edu.br',
    subject,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
    } else {
      console.log('E-mail enviado com sucesso:', info.response);
    }
  });
}

sendEmail('welcome',  { name: 'Artur' });
sendEmail('reset', { resetLink: 'https://seusite.com/reset/123' });
sendEmail('notification', { message: 'Temos novidades para você!' });

//##################################################################

const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // número de saltos para aumentar a segurança do hash 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error('Erro ao criar um hash da senha');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const resposta = await db.query("SELECT * FROM usuario");
    res.status(200).json(resposta);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erro ao buscar usuários", details: err.message });
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
    console.error(err); 
    res.status(500).send("Erro ao registrar o usuário");
  }
};

exports.getUserById = async (req, res) => {
  const id_user = req.params.id
  try {
    const resposta = await db.query("SELECT * FROM usuario WHERE id_usuario = $1", [id_user])
    res.status(200).send(resposta)
  } catch (err) {
    res.status(404).send(err)
  }
}

exports.deleteUser = async (req, res) => {
  const id_user = req.params.id
  try {
    await db.query('DELETE FROM usuario WHERE id_usuario = $1', [id_user])
    res.status(204).send()
  } catch (err) {
    res.status(500).json({"err": err})
  }

}

