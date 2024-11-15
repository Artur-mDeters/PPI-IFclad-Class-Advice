/* eslint-disable no-unused-vars */
import UiAppBar from "../../../../components/AppBar/AppBar";
import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

/**
 * ? Função para buscar todas as disciplinas disponíveis.
 * ! Endpoint: /todasAsDisciplinas
 */
const getAllSubjects = async () => {
  const { data } = await axios.get("http://localhost:3030/todasAsDisciplinas");
  return data;
};

/**
 * ? Função para buscar as notas dos alunos em uma disciplina específica.
 * ! Endpoint: /notas/{idSubject}/{idTurma}
 */
const getAllGradesByStudents = async (idSubject, idTurma) => {
  const { data } = await axios.get(
    `http://localhost:3030/notas/${idSubject}/${idTurma}`
  );
  return data;
};

const AllStudentGradesPage = () => {
  const idTurma = useParams().idTurma;

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentGradesInSubject, setStudentGradesInSubject] = useState([]);
  const [editedGrades, setEditedGrades] = useState({}); // Estado para armazenar as notas editadas.

  /**
   * ? Atualiza o estado da disciplina selecionada.
   */
  const handleChangeSubject = (event) => {
    setSelectedSubject(event.target.value);
  };

  /**
   * ? Atualiza a nota de um aluno específico em um campo específico.
   * @param {number} idAluno - ID do aluno.
   * @param {string} campo - Campo de nota a ser atualizado.
   * @param {string} valor - Novo valor da nota.
   */
  const handleChangeGrade = (idAluno, campo, valor) => {
    setEditedGrades((prevGrades) => ({
      ...prevGrades,
      [idAluno]: {
        ...prevGrades[idAluno], // Preserva as outras notas desse aluno.
        [campo]: valor, // Atualiza apenas o campo específico.
      },
    }));
  };

  /**
   * ? Busca todas as disciplinas na montagem do componente.
   */
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const result = await getAllSubjects();
        setSubjects(result);
      } catch (err) {
        console.error("Erro ao buscar disciplinas:", err);
      }
    };

    fetchSubjects();
  }, []);

  /**
   * ? Busca as notas dos alunos ao alterar a disciplina ou a turma.
   * Também inicializa o estado das notas editadas com os valores atuais.
   */
  useEffect(() => {
    const fetchGrades = async () => {
      if (idTurma && selectedSubject) {
        try {
          const result = await getAllGradesByStudents(selectedSubject, idTurma);
          setStudentGradesInSubject(result);

          const initialEditedGrades = result.reduce((acc, student) => {
            acc[student.fk_aluno_id_aluno] = {
              nota_parcial_np: student.nota_parcial_np || "",
              nota_primeiro_sem: student.nota_primeiro_sem || "",
              nota_segundo_sem: student.nota_segundo_sem || "",
              nota_final_nf: student.nota_final_nf || "",
            };
            return acc;
          }, {});
          setEditedGrades(initialEditedGrades);
        } catch (err) {
          console.error("Erro ao buscar notas:", err);
        }
      }
    };

    fetchGrades();
  }, [selectedSubject, idTurma]);

  return (
    <UiAppBar title={`Notas da turma: ${idTurma}`}>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="Select-Subject">Disciplina</InputLabel>
          <Select
            labelId="Select-Subject"
            id="SelectSubject"
            value={selectedSubject}
            label="Disciplina"
            onChange={handleChangeSubject}
          >
            {subjects.map((subject) => (
              <MenuItem
                key={subject.id_disciplina}
                value={subject.id_disciplina}
              >
                {subject.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Divider />
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Aluno</TableCell>
                <TableCell>Parcial 1</TableCell>
                <TableCell>Primeiro Semestre</TableCell>
                <TableCell>Parcial 2</TableCell>
                <TableCell>Segundo Semestre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentGradesInSubject.map((student) => (
                <TableRow key={student.fk_aluno_id_aluno}>
                  <TableCell>{student.nome}</TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.nota_parcial_np || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_parcial_np",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.nota_primeiro_sem || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_primeiro_sem",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.nota_parcial2 || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_parcial2",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.nota_segundo_sem || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_segundo_sem",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </UiAppBar>
  );
};

export default AllStudentGradesPage;
