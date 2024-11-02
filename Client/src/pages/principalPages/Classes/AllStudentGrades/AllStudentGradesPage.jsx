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
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const getAllSubjects = async () => {
  const { data } = await axios.get("http://localhost:3030/todasAsDisciplinas");
  return data;
};

const getAllGradesByStudents = async (idSubject, idTurma) => {
  // const { data } = await axios.get(
  //     `http://localhost:3030/todasAsNotasDaTurma/${idSubject}`
  // )
  // return data;
};

// ! export default AllStudentGradesPage;
// * página principal

const AllStudentGradesPage = () => {
  const idTurma = useParams().idTurma;

  const [subjects, setSubjects] = useState([]); // Inicializando como array
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentGradesInSubject, setStudentGradesInSubject] = useState([]);
  const [students, setStudents] = useState([]);

  const handleChangeSubject = (event) => {
    setSelectedSubject(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSubjects();
        console.log(result);
        setSubjects(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllGradesByStudents(subjects.id_disciplina);
        console.log(result, "result");
        return result;
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedSubject]);

  return (
    <UiAppBar title={"Notas da turma: "}>
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
                {subject.nome}{" "}
                {/* Certifique-se de que 'name' é uma propriedade válida */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Divider />
        {/* tabela de notas */}
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
              {studentGradesInSubject != []
                ? studentGradesInSubject.map((student) => (
                    <TableRow key={student.id_aluno}>
                      <TableCell>{student.nome}</TableCell>
                      <TableCell>{student.nota1}</TableCell>
                      <TableCell>{student.nota2}</TableCell>
                      <TableCell>{student.nota3}</TableCell>
                      <TableCell>{student.nota4}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </UiAppBar>
  );
};

export default AllStudentGradesPage;
