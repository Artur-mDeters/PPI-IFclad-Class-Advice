SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;
CREATE TABLE public.aluno (
    id_aluno uuid NOT NULL,
    matricula character varying(50) NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255),
    genero character varying(10),
    nascimento character varying(100),
    cidade character varying(100),
    foto bytea,
    interno character varying(255),
    uf character(2),
    reprovou character varying(255),
    id_turma uuid
);
ALTER TABLE public.aluno OWNER TO postgres;
CREATE TABLE public.conselho_de_classe (
    id_conselho uuid NOT NULL,
    data date NOT NULL,
    id_turma uuid
);
ALTER TABLE public.conselho_de_classe OWNER TO postgres;
CREATE TABLE public.curso (
    id_curso uuid NOT NULL,
    nome character varying(255) NOT NULL,
    padrao integer,
    id_professor uuid
);
ALTER TABLE public.curso OWNER TO postgres;
CREATE TABLE public.direcao_ensino (
    id_direcao_ensino uuid NOT NULL,
    id_setor uuid
);
ALTER TABLE public.direcao_ensino OWNER TO postgres;
CREATE TABLE public.disciplina (
    id_disciplina uuid NOT NULL,
    nome character varying(255) NOT NULL
);
ALTER TABLE public.disciplina OWNER TO postgres;
CREATE TABLE public.notas (
    id_notas uuid NOT NULL,
    id_aluno uuid NOT NULL,
    fk_id_disciplina uuid NOT NULL,
    "AISb10" double precision,
    "AISb3" double precision,
    mostra_cultural double precision,
    "PPI" double precision,
    "PPIb1" double precision,
    faltas integer,
    media_geral double precision,
    "AIA" double precision,
    reprovacoes integer,
    parcial1 double precision,
    semestre1 double precision,
    parcial2 double precision,
    semestre2 double precision,
    exame double precision,
    nota_parcial double precision,
    nota_final double precision,
    situacao character varying(10)
);
ALTER TABLE public.notas OWNER TO postgres;
CREATE TABLE public.observacoes (
    id_observacao uuid NOT NULL,
    data date NOT NULL,
    texto text,
    hora time without time zone,
    id_aluno uuid
);
ALTER TABLE public.observacoes OWNER TO postgres;
CREATE TABLE public.professor (
    id_professor uuid NOT NULL,
    id_usuario uuid
);
ALTER TABLE public.professor OWNER TO postgres;
CREATE TABLE public.professor_disciplina (
    fk_id_professor uuid,
    fk_id_disciplina uuid
);
ALTER TABLE public.professor_disciplina OWNER TO postgres;
CREATE TABLE public.rec_paralela (
    id_rec_paralela uuid NOT NULL,
    data date NOT NULL,
    nome character varying(100)
);
ALTER TABLE public.rec_paralela OWNER TO postgres;
CREATE TABLE public.reg_academicos (
    id_reg_academicos uuid NOT NULL,
    id_setor uuid
);
ALTER TABLE public.reg_academicos OWNER TO postgres;
CREATE TABLE public.rel_atividades (
    id_rel_atividades uuid NOT NULL,
    data date NOT NULL,
    nome character varying(100),
    id_rec_paralela uuid
);
ALTER TABLE public.rel_atividades OWNER TO postgres;
CREATE TABLE public.setor (
    id_setor uuid NOT NULL,
    nome character varying(100) NOT NULL
);
ALTER TABLE public.setor OWNER TO postgres;
CREATE TABLE public.turma (
    id_turma uuid NOT NULL,
    nome character varying(100) NOT NULL,
    ano_inicio integer NOT NULL,
    id_curso uuid
);
ALTER TABLE public.turma OWNER TO postgres;
CREATE TABLE public.turma_disciplina (
    id_turma uuid,
    id_disciplina uuid
);
ALTER TABLE public.turma_disciplina OWNER TO postgres;
CREATE TABLE public.usuario (
    id_usuario uuid NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    nome character varying(255) NOT NULL,
    siape character varying(20),
    usuario_tp character varying(50),
    bio character varying(255)
);
ALTER TABLE public.usuario OWNER TO postgres;
ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_email_key UNIQUE (email);
ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_matricula_key UNIQUE (matricula);
ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT aluno_pkey PRIMARY KEY (id_aluno);
ALTER TABLE ONLY public.conselho_de_classe
    ADD CONSTRAINT conselho_de_classe_pkey PRIMARY KEY (id_conselho);
ALTER TABLE ONLY public.curso
    ADD CONSTRAINT curso_pkey PRIMARY KEY (id_curso);
ALTER TABLE ONLY public.direcao_ensino
    ADD CONSTRAINT direcao_ensino_pkey PRIMARY KEY (id_direcao_ensino);
ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT disciplina_pkey PRIMARY KEY (id_disciplina);
ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_pkey PRIMARY KEY (id_notas);
ALTER TABLE ONLY public.observacoes
    ADD CONSTRAINT observacoes_pkey PRIMARY KEY (id_observacao);
ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (id_professor);
ALTER TABLE ONLY public.rec_paralela
    ADD CONSTRAINT rec_paralela_pkey PRIMARY KEY (id_rec_paralela);
ALTER TABLE ONLY public.reg_academicos
    ADD CONSTRAINT reg_academicos_pkey PRIMARY KEY (id_reg_academicos);
ALTER TABLE ONLY public.rel_atividades
    ADD CONSTRAINT rel_atividades_pkey PRIMARY KEY (id_rel_atividades);
ALTER TABLE ONLY public.setor
    ADD CONSTRAINT setor_pkey PRIMARY KEY (id_setor);
ALTER TABLE ONLY public.turma
    ADD CONSTRAINT turma_pkey PRIMARY KEY (id_turma);
ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);
ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);
ALTER TABLE ONLY public.conselho_de_classe
    ADD CONSTRAINT conselho_de_classe_id_turma_fkey FOREIGN KEY (id_turma) REFERENCES public.turma(id_turma);
ALTER TABLE ONLY public.direcao_ensino
    ADD CONSTRAINT direcao_ensino_id_setor_fkey FOREIGN KEY (id_setor) REFERENCES public.setor(id_setor);
ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES public.aluno(id_aluno);
ALTER TABLE ONLY public.observacoes
    ADD CONSTRAINT observacoes_id_aluno_fkey FOREIGN KEY (id_aluno) REFERENCES public.aluno(id_aluno);
ALTER TABLE ONLY public.reg_academicos
    ADD CONSTRAINT reg_academicos_id_setor_fkey FOREIGN KEY (id_setor) REFERENCES public.setor(id_setor);
ALTER TABLE ONLY public.rel_atividades
    ADD CONSTRAINT rel_atividades_id_rec_paralela_fkey FOREIGN KEY (id_rec_paralela) REFERENCES public.rec_paralela(id_rec_paralela);
ALTER TABLE ONLY public.rel_atividades
    ADD CONSTRAINT rel_atividades_id_rec_paralela_fkey FOREIGN KEY (id_rec_paralela) REFERENCES public.rec_paralela(id_rec_paralela);
ALTER TABLE ONLY public.turma
    ADD CONSTRAINT turma_id_curso_fkey FOREIGN KEY (id_curso) REFERENCES public.curso(id_curso);
