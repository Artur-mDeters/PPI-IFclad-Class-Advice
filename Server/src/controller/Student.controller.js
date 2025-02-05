const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "fotos"); // Pasta onde a imagem será salva
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Função para salvar imagem base64
const saveBase64Image = (base64String, id_student) => {
  if (!base64String) return null;
  
  try {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    
    // Alterando o caminho para a nova pasta
    const uploadDir = path.join(__dirname, '../../fotos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const fileName = `${id_student}.jpg`;
    fs.writeFileSync(path.join(uploadDir, fileName), base64Data, 'base64');
    
    return `${fileName}`;
  } catch (error) {
    console.error('Erro ao salvar imagem:', error);
    return null;
  }
};

exports.addStudent = async (req, res) => {
  try {
    const {
      name,
      registration,
      email,
      gender,
      dateOfBirth,
      city,
      federativeUnity,
      internal,
      course,
      photo
    } = req.body;

    const id_student = uuidv4();
    const photoFileName = photo ? saveBase64Image(photo, id_student) : null;

    // Inserir aluno no banco de dados
    const insertResponse = await db.query(
      `INSERT INTO aluno (
        id_aluno, 
        nome, 
        matricula, 
        email, 
        genero, 
        nascimento, 
        cidade, 
        uf, 
        interno, 
        id_turma,
        foto_path
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        id_student,
        name,
        registration,
        email,
        gender,
        dateOfBirth,
        city,
        federativeUnity,
        internal,
        course,
        photoFileName
      ]
    );

    // Buscar disciplinas
    const subjects = await db.any("SELECT id_disciplina FROM disciplina");

    // Inserção de notas para cada disciplina associada ao aluno
    for (const { id_disciplina } of subjects) {
      const id_notas = uuidv4();
      await db.query(
        "INSERT INTO notas (id_notas, id_aluno, fk_id_disciplina) VALUES ($1, $2, $3)",
        [id_notas, id_student, id_disciplina]
      );
    }

    res.status(201).send({ 
      message: "Aluno e notas inseridos com sucesso.",
      id: id_student 
    });
  } catch (err) {
    console.error("Erro detalhado ao inserir aluno:", err);
    res.status(500).send({ 
      error: "Erro ao inserir aluno.", 
      details: err.message,
      stack: err.stack
    });
  }
};

exports.updateStudent = [upload.single("photo"), async (req, res) => {
  const id_student = req.params.idStudent;
  const {
    name,
    registration,
    email,
    gender,
    dateOfBirth,
    city,
    federativeUnity,
    internal,
  } = req.body;

  const photoPath = req.file ? `/fotos/${req.file.filename}` : null;

  try {
    const updateQuery = `UPDATE aluno
      SET nome = $1, matricula = $2, email = $3, genero = $4, nascimento = $5, cidade = $6, uf = $7, interno = $8${photoPath ? ", foto_path = $9" : ""}
      WHERE id_aluno = $10
      RETURNING *`;

    const values = [
      name,
      registration,
      email,
      gender,
      dateOfBirth,
      city,
      federativeUnity,
      internal,
    ];

    if (photoPath) values.push(photoPath);
    values.push(id_student);

    const response = await db.query(updateQuery, values);

    res.status(200).json(response);
  } catch (err) {
    console.error("Erro ao atualizar aluno:", err);
    res.status(500).send("Erro interno do servidor");
  }
}];

exports.getStudent = async (req, res) => {
  const id = req.params.idTurma;
  try {
    const response = await db.query(
      "SELECT * FROM aluno WHERE id_turma = $1",
      id
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.getStudentByID = async (req, res) => {
  // const idTurma = req.params.idTurma;
  const idStudent = req.params.idStudent;
  try {
    const response = await db.query(
      "SELECT * FROM aluno WHERE id_aluno = $1 ",
      idStudent
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.excludeStudent = async (req, res) => {
  const idStudent = req.params.idStudent;
  try {
    // Primeiro, excluímos as associações na tabela aluno_disciplina
    await db.query(
      `DELETE FROM notas WHERE id_aluno = $1`,
      [idStudent]
    );

    // Em seguida, excluímos o aluno da tabela aluno
    await db.query(`DELETE FROM aluno WHERE id_aluno = $1`, [idStudent]);

    res
      .status(205)
      .send("Aluno e registros relacionados excluídos com sucesso.");
  } catch (err) {
    console.error("Erro ao excluir aluno:", err);
    res.status(500).send("Erro interno do servidor ao tentar excluir aluno.");
  }
};

exports.getStudentsByClass = async (req, res) => {
  const turma = req.params.idTurma;
  try {
    const response = await db.query(
      "SELECT *, foto_path FROM aluno WHERE id_turma = $1",
      [turma]
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getStudentPhoto = async (req, res) => {
  const nomeDaFoto = req.params.nomeDaFoto;
  const caminhoDaFoto = path.join(__dirname, "..", "..", "fotos", nomeDaFoto);
  console.log( "caminho: ", caminhoDaFoto)

  res.sendFile(caminhoDaFoto, (err) => {
    if (err) {
      console.error("Erro ao carregar a foto:", err);
      res.status(404).send("Foto não encontrada.");
    }
  });
}
