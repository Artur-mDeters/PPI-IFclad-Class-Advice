const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const templates = require("../../emails/templates.email");
// require('dotenv').config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  }
});

async function sendEmail(dia, nome, email, subject) {
  try {
    const info = await transporter.sendMail({
      from: '"IFCLAD - Class Advice" <ifclad@proton.me>',
      to: email,
      subject,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color:rgb(206, 48, 0);">Atenção!!</h2>
        <p>Conselho de classe da turma ${nome} foi agendado para o dia: ${dia}</p>
        Fique atento para adicionar as notas dentro do prazo!
      </div>`
    });

    console.log("Email enviado:", info.response);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../fotos"); // Pasta onde a imagem será salva
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

exports.getClass = async (___, res) => {
  try {
    const response = await db.query("SELECT * FROM turma");
    res.status(200).json(response);
  } catch (err) {
    throw new Error(err);
    res.status(500).send(err);
  }
};

exports.getClassByID = async (req, res) => {
  const id_class = req.params.id;
  try {
    const response = await db.query("SELECT * FROM turma WHERE id_turma = $1", [
      id_class,
    ]);
    res.status(200).send(response);
  } catch (err) {
    console.error("GET TURMA BY ID", err);
    res.status(500).send(err);
  }
};

exports.addClass = async (req, res) => {
  const { name, start_year, course, subjects } = req.body;
  try {
    const id_class = uuidv4();

    const response = await db.query(
      "INSERT INTO turma (id_turma, nome, ano_inicio, id_curso) VALUES ($1, $2, $3, $4)",
      [id_class, name, start_year, course]
    );

    if (subjects && subjects.length > 0) {
      for (const subject of subjects) {
        // Gera um UUID válido para cada disciplina se necessário
        await db.query(
          "INSERT INTO turma_disciplina (id_disciplina, id_turma) VALUES ($1, $2)",
          [subject, id_class]
        );
      }
    }
  
    res.status(200).json(response); 
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.editClass = async (req, res) => {
  const id_class = req.params.id;
  const { start_year, name, id_course } = req.body;
  try {
    const result = await db.query(
      "UPDATE turma SET nome = $1, ano_inicio = $2, id_curso = $3 WHERE id_turma = $4 ",
      [name, start_year, id_course, id_class]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    throw new Error(err);
    res.status(500).json(err);
  }
};

// ! Exemplo de requisição para excluir uma turma (usar ela como padrão para todas as outras)
exports.deleteClass = async (req, res) => {
  const id_class = req.params.id;

  try {
    feat;
    await db.query(
      `DELETE FROM notas WHERE id_aluno IN (SELECT id_aluno FROM aluno WHERE id_turma = $1)`,
      [id_class]
    );

    main;
    await db.query(
      "DELETE FROM notas WHERE id_aluno IN (SELECT id_aluno FROM aluno WHERE id_turma = $1)",
      [id_class]
    );

    await db.query("DELETE FROM aluno WHERE id_turma = $1", [id_class]);

    // Exclui a turma
    const result = await db.query("DELETE FROM turma WHERE id_turma = $1", [
      id_class,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(204).send(); // Sucesso
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erro interno
  }
};

exports.AddClassCouncil = async (req, res) => {
  const id_class = req.params.id; // ID da turma vindo dos parâmetros
  const { conselho, nameClass } = req.body; // Data do conselho vindo no corpo da requisição

  try {
    const id_conselho = uuidv4();

    console.log(conselho, id_class, id_conselho);

    // Inserção do conselho de classe
    const result = await db.query(
      "INSERT INTO conselho_de_classe (id_conselho, id_turma, data) VALUES ($1, $2, $3)",
      [id_conselho, id_class, conselho]
    );

    // Recuperando todos os emails dos usuários
    const allEmailsAndNames = await db.query("SELECT email FROM usuario");

    // Envio de emails para cada usuário
    for (const user of allEmailsAndNames) {
      if (user.email) {
        try {
          await sendEmail(conselho, nameClass, user.email, "Novo conselho de classe agendado");
        } catch (emailErr) {
          console.error(`Erro ao enviar e-mail para ${user.email}:`, emailErr);
        }
      }
    }

    // Resposta ao cliente
    res.status(200).json({ message: "Class council scheduled successfully" });
  } catch (err) {
    console.error("Erro ao agendar conselho de classe:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.getAllSubjectsOfClass = async (req, res) => {
  const id_class = req.params.id;
  try {
    const response = await db.query(
      `SELECT 
    d.id_disciplina,
    d.nome AS nome_disciplina,
    t.id_turma,
    t.nome AS nome_turma,
    t.ano_inicio
FROM 
    turma_disciplina td
INNER JOIN 
    disciplina d ON td.id_disciplina = d.id_disciplina
INNER JOIN 
    turma t ON td.id_turma = t.id_turma
WHERE 
    t.id_turma = $1;`,
      [id_class]
    );
    console.log(response)
    res.status(200).json(response);
  } catch (err) {
    throw new Error("erro ao procurar disciplinas da turma: ", err);
  }
};
