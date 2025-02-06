const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const e = require("express");

const nodemailer = require("nodemailer");
const templates = require("../../emails/templates.email");
require('dotenv').config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  }
});

async function sendEmail(id_usuario, nome, email, subject) {
  try {
    const info = await transporter.sendMail({
      from: '"IFCLAD - Class Advice" <ifclad@proton.me>',
      to: email,
      subject,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #004080;">Bem-vindo, ${nome}!</h2>
        <p>Você foi cadastrado no IFClad por um administrador. Ficamos felizes em ter você conosco!</p>
        Clique no botão abaixo para adicionar uma senha!
        <a href="http://localhost:5173/recover-password/${id_usuario}" style="background-color:rgb(165, 0, 187); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Alterar senha</a>
      </div>`
    });

    console.log("Email enviado:", info.response);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
}


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
    // sendEmail(resposta[0].id_usuario, resposta[0].nome, "artur.2021301162@aluno.iffar.edu.br", "Bem-vindo ao IFClad!");
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
    const id_usuario = await uuidv4();
    // await sendEmail(id_usuario, name, email, "Bem-vindo ao IFClad!");
    await db.query(
      "INSERT INTO usuario (email, senha, nome, siape, usuario_tipo, id_usuario) VALUES ($1, $2, $3, $4, $5, $6)",
      [email, password, name, siape, type, id_usuario]
    );

    res.status(200).send("Usuário registrado com sucesso");
    // 
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

