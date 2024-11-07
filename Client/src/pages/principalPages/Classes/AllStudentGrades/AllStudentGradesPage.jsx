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

const getAllSubjects = async () => {
  const { data } = await axios.get("http://localhost:3030/todasAsDisciplinas");
  return data;
};

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
  const [editedGrades, setEditedGrades] = useState({}); // Novo estado para as notas editadas

  const handleChangeSubject = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleChangeGrade = (idAluno, campo, valor) => {
    setEditedGrades((prevGrades) => ({
      ...prevGrades,
      [idAluno]: {
        ...prevGrades[idAluno], // preserva as outras notas desse aluno
        [campo]: valor, // atualiza apenas o campo específico
      },
    }));
  };

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

  useEffect(() => {
    const fetchGrades = async () => {
      if (idTurma && selectedSubject) {
        try {
          const result = await getAllGradesByStudents(selectedSubject, idTurma);
          setStudentGradesInSubject(result);

          // Inicializa o estado das notas editadas com as notas atuais dos alunos
          const initialEditedGrades = result.reduce((acc, student) => {
            acc[student.id_aluno] = {
              nota_parcial1: student.nota_parcial1 || "",
              nota_primeiro_semestre: student.nota_primeiro_semestre || "",
              nota_parcial2: student.nota_parcial2 || "",
              nota_segundo_semestre: student.nota_segundo_semestre || "",
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
                <TableRow key={student.id_aluno}>
                  <TableCell>{student.nome}</TableCell>
                  <TableCell>
                    <TextField
                      label=""
                      value={
                        editedGrades[student.id_aluno]?.nota_parcial1 || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.id_aluno,
                          "nota_parcial1",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label=""
                      value={
                        editedGrades[student.id_aluno]
                          ?.nota_primeiro_semestre || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.id_aluno,
                          "nota_primeiro_semestre",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label=""
                      value={
                        editedGrades[student.id_aluno]?.nota_parcial2 || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.id_aluno,
                          "nota_parcial2",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label=""
                      value={
                        editedGrades[student.id_aluno]?.nota_segundo_semestre ||
                        ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.id_aluno,
                          "nota_segundo_semestre",
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
