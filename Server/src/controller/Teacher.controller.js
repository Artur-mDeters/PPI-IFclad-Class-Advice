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

    await db.query(
      "INSERT INTO usuario (email, senha, nome, siape, usuario_tipo, id_usuario) VALUES ($1, $2, $3, $4, $5, $6)",
      [email, password, name, siape, type, id_usuario]
    );


    if (subjects && subjects.length > 0) {

      for (const subject of subjects) {
        // Gera um UUID válido para cada disciplina se necessário
        await db.query(
          "INSERT INTO professor_disciplina (fk_id_disciplina, fk_id_usuario) VALUES ($1, $2)",
          [subject, id_usuario]
        );
      }

    }

    res.status(200).send("Usuário registrado com sucesso");
  } catch (err) {
    console.error('Erro:', err.message); // Exibe a mensagem do erro
    console.error('Detalhes do erro:', err); // Exibe o erro completo
    res.status(500).send({ error: 'Erro ao registrar o usuário', details: err.message });
  }
};

// Editar professor
exports.editTeacher = async (req, res) => {
  const id = req.params.id;
  const { name, bio, subjects } = req.body;
  const type = tipoUsuarioProfessor;

  // Verifica se pelo menos um dos campos a ser atualizado está presente
  if (!name && !bio && !subjects) {
    return res.status(400).send({ error: 'Pelo menos um dos campos (nome, bio ou disciplinas) deve ser fornecido' });
  }

  try {
    const updates = [];
    const values = [];

    // Atualiza nome
    if (name) {
      updates.push(`nome = $${updates.length + 1}`);
      values.push(name);
    }

    // Atualiza bio
    if (bio) {
      updates.push(`bio = $${updates.length + 1}`);
      values.push(bio);
    }

    // Se houver atualizações a serem feitas, construa e execute a consulta
    if (updates.length > 0) {
      values.push(id); // Adiciona o ID do professor à lista de valores
      values.push(type); // Adiciona o tipo de usuário à lista de valores

      await db.query(
        `UPDATE usuario SET ${updates.join(', ')} WHERE id_usuario = $${values.length - 1} AND usuario_tipo = $${values.length}`,
        values
      );
    }

    // Remove as disciplinas antigas associadas ao professor
    await db.query(
      "DELETE FROM professor_disciplina WHERE fk_id_usuario = $1",
      [id]
    );

    // Adiciona as novas disciplinas associadas ao professor, se houver
    if (subjects && subjects.length > 0) {
      const insertValues = subjects.map(subject => [subject, id]);
      await db.query(
        "INSERT INTO professor_disciplina (fk_id_disciplina, fk_id_usuario) VALUES " +
        insertValues.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', '),
        insertValues.flat()
      );
    }

    res.status(200).send("Dados do professor atualizados com sucesso");
  } catch (err) {
    console.error('Erro ao atualizar professor:', err.message);
    res.status(500).send({ error: 'Erro ao atualizar o professor', details: err.message });
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

exports.deleteTeacher = async (req, res) => {
  const id = req.params.id;
  const type = tipoUsuarioProfessor;

  try {
    // Primeiro, remove as disciplinas associadas ao professor
    await db.query(
      "DELETE FROM professor_disciplina WHERE fk_id_usuario = $1",
      [id]
    );

    // Em seguida, remove o professor da tabela de usuários
    const result = await db.query(
      "DELETE FROM usuario WHERE id_usuario = $1 AND usuario_tipo = $2",
      [id, type]
    );

    // Verifica se algum registro foi deletado
    if (result.rowCount === 0) {
      return res.status(404).send({ error: 'Professor não encontrado ou não é um professor' });
    }

    res.status(200).send("Professor excluído com sucesso");
  } catch (err) {
    console.error('Erro ao excluir professor:', err.message);
    res.status(500).send({ error: 'Erro ao excluir o professor', details: err.message });
  }
};

