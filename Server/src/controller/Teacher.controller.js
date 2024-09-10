const generator = require('generate-password');
const db = require('../db/db')
const { v4: uuidv4 } = require('uuid');

const tipoUsuarioProfessor = 1

exports.addTeacher = async (req, res) => {
  const { email, name, siape, subjects } = req.body;
  const type = 1;

  try {
    const id_usuario = uuidv4(); // Gera um UUID válido
    console.log(`Gerando senha para o usuário: ${email}`);
    
    const password = generator.generate({
      length: 7,
      numbers: true,
    });
    console.log(`Senha gerada: ${password}`);
    
    console.log('Inserindo usuário no banco de dados...');
    await db.query(
      "INSERT INTO usuario (email, senha, nome, siape, usuario_tipo, id_usuario) VALUES ($1, $2, $3, $4, $5, $6)",
      [email, password, name, siape, type, id_usuario]
    );
    console.log('Usuário inserido com sucesso.');

    if (subjects && subjects.length > 0) {
      console.log('Inserindo disciplinas vinculadas...');
      for (const subject of subjects) {
        // Gera um UUID válido para cada disciplina se necessário
        await db.query(
          "INSERT INTO professor_disciplina (fk_id_disciplina, fk_id_usuario) VALUES ($1, $2)",
          [subject, id_usuario]
        );
      }
      console.log('Disciplinas inseridas com sucesso.');
    }

    res.status(200).send("Usuário registrado com sucesso");
  } catch (err) {
    console.error('Erro:', err.message); // Exibe a mensagem do erro
    console.error('Detalhes do erro:', err); // Exibe o erro completo
    res.status(500).send({ error: 'Erro ao registrar o usuário', details: err.message });
  }
};

exports.getProfessores = async (req, res) => {
    try {
      const resposta = await db.query("SELECT * FROM usuario WHERE usuario_tipo = $1", [tipoUsuarioProfessor]);
      res.status(200).json(resposta);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erro ao buscar usuários", details: err.message });
    }
  };

exports.getProfessorById = async (req, res) => {
  const id_user = req.params.id
  try {
      const resposta = await db.query("SELECT * FROM usuario WHERE id_usuario = $1 AND usuario_tipo = $2", [id_user, tipoUsuarioProfessor])
      res.status(200).send(resposta)
  } catch (err) {
      res.status(404).send(err)
  }
}

