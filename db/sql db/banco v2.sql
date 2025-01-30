-- Tabela aluno
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    matricula VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    genero VARCHAR(20),
    nascimento DATE,
    cidade VARCHAR(100),
    foto TEXT,
    interno BOOLEAN,
    uf CHAR(2),
    reprovou BOOLEAN,
    id_turma INT
);

-- Tabela conselho_de_classe
CREATE TABLE conselho_de_classe (
    id_conselho SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    id_turma INT
);

-- Tabela curso
CREATE TABLE curso (
    id_curso SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    padrao BOOLEAN,
    id_professor INT
);

-- Tabela direcao_ensino
CREATE TABLE direcao_ensino (
    id_direcao_ensino SERIAL PRIMARY KEY,
    id_setor INT
);

-- Tabela disciplina
CREATE TABLE disciplina (
    id_disciplina SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela notas
CREATE TABLE notas (
    id_aluno INT REFERENCES aluno(id_aluno),
    fk_id_disciplina INT REFERENCES disciplina(id_disciplina),
    ais_b10 FLOAT,
    ais_b3 FLOAT,
    mostra_de_ciencias FLOAT,
    ppi FLOAT,
    ppi_b10 FLOAT,
    faltas INT,
    media_geral FLOAT,
    aia FLOAT,
    reprovacoes INT,
    parcial1 FLOAT,
    semestre1 FLOAT,
    parcial2 FLOAT,
    semestre2 FLOAT,
    exame FLOAT,
    nota_parcial FLOAT,
    nota_final FLOAT,
    situacao VARCHAR(50),
    observacao TEXT,
    PRIMARY KEY (id_aluno, fk_id_disciplina)
);

-- Tabela observacoes
CREATE TABLE observacoes (
    id_observacao SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    texto TEXT NOT NULL,
    hora TIME,
    id_aluno INT REFERENCES aluno(id_aluno)
);

-- Tabela professor
CREATE TABLE professor (
    id_professor SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuario(id_usuario)
);

-- Tabela professor_disciplina
CREATE TABLE professor_disciplina (
    fk_id_professor INT REFERENCES professor(id_professor),
    fk_id_disciplina INT REFERENCES disciplina(id_disciplina),
    PRIMARY KEY (fk_id_professor, fk_id_disciplina)
);

-- Tabela rec_paralela
CREATE TABLE rec_paralela (
    id_rec_paralela SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    nome VARCHAR(100) NOT NULL
);

-- Tabela reg_academicos
CREATE TABLE reg_academicos (
    id_reg_academicos SERIAL PRIMARY KEY,
    id_setor INT
);

-- Tabela rel_atividades
CREATE TABLE rel_atividades (
    id_rel_atividades SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    id_rec_paralela INT REFERENCES rec_paralela(id_rec_paralela)
);

-- Tabela setor
CREATE TABLE setor (
    id_setor SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela turma
CREATE TABLE turma (
    id_turma SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ano_inicio INT,
    id_curso INT REFERENCES curso(id_curso)
);

-- Tabela turma_disciplina
CREATE TABLE turma_disciplina (
    id_turma INT REFERENCES turma(id_turma),
    id_disciplina INT REFERENCES disciplina(id_disciplina),
    PRIMARY KEY (id_turma, id_disciplina)
);

-- Tabela usuario
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    siape VARCHAR(50),
    usuario_tp VARCHAR(50),
    bio TEXT
);