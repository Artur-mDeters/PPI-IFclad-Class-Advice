import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Snackbar,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
// import { use } from "../../../../../../Server/src/routes/grades.routes";

import GradeTextField from './GradeTextfield'; // Ajuste o caminho conforme necessário
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
  const data  = await axios.get(
    `http://localhost:3030/notas/${idSubject}/${idTurma}`
  );
  return(data.data);
};

const AllStudentGradesPage = () => {
  const { idTurma } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentGrades, setStudentGrades] = useState([]);
  const [editedGrades, setEditedGrades] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [observation, setObservation] = useState("");

  const handleOpenDialog = (idAluno) => {
    setCurrentStudentId(idAluno);
    setObservation(editedGrades[idAluno]?.observacao || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveObservation = () => {
    setEditedGrades((prev) => ({
      ...prev,
      [currentStudentId]: {
        ...prev[currentStudentId],
        observacao: observation,
      },
    }));
    setOpenDialog(false);
  };

  const formatGrade = (value) => {
    if (value === "") return "";
    const number = parseInt(value, 10);
    if (isNaN(number) || number > 999) return ""; // Restrição para números acima de 999

    if (number <= 9) {
      return number.toFixed(1); // Mantém o formato correto para números pequenos
    }
    if (number == 10) {
      return number.toFixed(1); // Mantém o formato correto para números pequenos
    }
    if (number <= 99) {
      return (number / 10).toFixed(1); // Divide por 10 para notas entre 10 e 99
    }

    return (number / 100).toFixed(2); // Divide por 100 para notas a partir de 100
  };

  const formatFaltas = (value) => {
    const number = parseInt(value, 10);
    if (isNaN(number)) return "";
    return Math.min(Math.max(number, 0), 9999);
  };

  const handleGradeChange = (idAluno, field, value) => {
    setEditedGrades((prev) => ({
      ...prev,
      [idAluno]: {
        ...prev[idAluno],
        [field]: value,
      },
    }));
    console.log(editedGrades);
  };

  const handleBlur = (idAluno, field) => {
    setEditedGrades((prev) => ({
      ...prev,
      [idAluno]: {
        ...prev[idAluno],
        [field]:
          field === "faltas"
            ? formatFaltas(prev[idAluno][field])
            : formatGrade(prev[idAluno][field]),
      },
    }));
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Impede o comportamento padrão do Tab

      // Identifica a linha atual e a célula ativa
      const currentRow = e.target.closest("tr");
      const nextRow = currentRow.nextElementSibling;

      // Verifica se a próxima linha existe
      if (nextRow) {
        // Obtém a célula da linha seguinte na mesma coluna (sem mudar a coluna)
        const nextCell = nextRow.children[colIndex].querySelector("input");

        // Se a célula da próxima linha existe, foca nela
        if (nextCell) {
          nextCell.focus(); // Foca na célula da linha seguinte
        }
      }
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/todasAsDisciplinas"
        );
        setSubjects(response.data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Erro ao buscar disciplinas.",
          severity: "error",
        });
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchGrades = async () => {
      if (idTurma && selectedSubject) {
        try {
          const response = await axios.get(
            `http://localhost:3030/notas/${selectedSubject}/${idTurma}`
          );
          setStudentGrades(response.data);

          const initialEditedGrades = response.data.reduce((acc, student) => {
            acc[student.id_aluno] = {
              parcial1: student.parcial1 || null,
              semestre1: student.semestre1 || null,
              parcial2: student.parcial2 || null,
              semestre2: student.semestre2 || null,
              ais_b10: student.ais_b10 || null,
              ppi_b10: student.ppi_b10 || null,
              mostra_de_ciencias: student.mostra_de_ciencias || null,
              faltas: student.faltas || null,
              aia: student.aia || null,
              observacao: student.observacao || null,
              nota_final: student.nota_final || null,
              id_aluno: student.id_aluno, // ID do aluno incluído aqui
            };
            console.log("teste:",acc)
            return acc;
          }, {});
          
          setEditedGrades(initialEditedGrades);
        } catch (error) {
          setSnackbar({
            open: true,
            message: "Erro ao buscar notas.",
            severity: "error",
          });
        }
      }
    };
    fetchGrades();
  }, [selectedSubject, idTurma]);

  const handleSaveGrades = async () => {
    try {
      await axios.post(`http://localhost:3030/notas/${selectedSubject}`, {
        grades: editedGrades // Isso já contém o id_aluno de cada aluno
      });      
      setSnackbar({
        open: true,
        message: "Notas salvas com sucesso!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao salvar notas.",
        severity: "error",
      });
    }
  };

  const calculateFinalGrade = (studentId) => {
    const student = editedGrades[studentId];
    if (!student) return "-";

    const gradeFields = [
      "parcial1",
      "semestre1",
      "parcial2",
      "semestre2",
      "ais_b10",
      "ppi_b10",
      "mostra_de_ciencias",
    ];

    const grades = gradeFields.map((field) => parseFloat(student[field]) || 0);
    const total = grades.reduce((acc, grade) => acc + grade, 0);
    const average = (total / gradeFields.length).toFixed(2);

    return average;
  };

  const getStatus = (studentId) => {
    const student = editedGrades[studentId];
    if (!student) return "--";

    const requiredFields = [
      "parcial1",
      "semestre1",
      "parcial2",
      "semestre2",
      "ais_b10",
      "ppi_b10",
      "mostra_de_ciencias",
    ];

    const allGradesFilled = requiredFields.every(
      (field) => student[field] !== undefined && student[field] !== null
    );
    if (!allGradesFilled) return "--";

    const finalGrade = parseFloat(calculateFinalGrade(studentId));
    const aia = parseFloat(student["aia"] || 0);

    if (finalGrade < 5 && aia) return { label: "REPROVADO", color: "error" };
    if (finalGrade < 7) return { label: "EXAME", color: "warning" };
    return { label: "APROVADO", color: "success" };
  };

  return (
    <UiAppBar title={"Notas da turma: ${idTurma}"}>
      <Box sx={{ marginBottom: "10px" }}>
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
        <Alert
          variant="outlined"
          severity="warning"
          sx={{ marginBottom: "10px" }}
        >
          Todas as notas devem ser inseridas em base 10
        </Alert>
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
                <TableCell>PPI</TableCell>
                <TableCell>Mostra de Ciências</TableCell>
                <TableCell>AIS</TableCell>
                <TableCell>Faltas</TableCell>
                <TableCell>AIA</TableCell>
                <TableCell>Nota Final</TableCell>
                <TableCell>Observação</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {studentGradesInSubject.map((student) => (
                <TableRow key={student.fk_aluno_id_aluno}>
                  <TableCell>{student.nome}</TableCell>
                  <TableCell>
                    <GradeTextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.pars_primeiro_sem
                      }
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "pars_primeiro_sem",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.nota_primeiro_sem
                      }
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_primeiro_sem",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.pars_segundo_sem
                      }
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "pars_segundo_sem",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.nota_segundo_sem
                      }
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_segundo_sem",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={editedGrades[student.fk_aluno_id_aluno]?.nota_ppi}
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_ppi",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.nota_mostra_de_ciencias
                      }
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_mostra_de_ciencias",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={editedGrades[student.fk_aluno_id_aluno]?.nota_ais}
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_ais",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={editedGrades[student.fk_aluno_id_aluno]?.faltas}
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "faltas",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={editedGrades[student.fk_aluno_id_aluno]?.nota_aia}
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_aia",
                          value
                        )
                      }
                      disabled={(() => {
                        const grades =
                          editedGrades[student.fk_aluno_id_aluno] || {};
                        const notaPrimeiroSem =
                          (grades.pars_primeiro_sem * 0.2 +
                            grades.nota_ais * 0.3 +
                            grades.nota_primeiro_sem * 0.5) *
                          0.4;

                        const notaSegundoSem =
                          (grades.pars_segundo_sem * 0.2 +
                            grades.nota_ppi * 0.2 +
                            grades.nota_mostra_de_ciencias * 0.2 +
                            grades.nota_segundo_sem * 0.5) *
                          0.6;

                        const notaFinal = notaPrimeiroSem + notaSegundoSem;

                        return (
                          grades.pars_primeiro_sem == null ||
                          grades.nota_ais == null ||
                          grades.nota_primeiro_sem == null ||
                          grades.pars_segundo_sem == null ||
                          grades.nota_ppi == null ||
                          grades.nota_mostra_de_ciencias == null ||
                          grades.nota_segundo_sem == null ||
                          notaFinal >= 7
                        );
                      })()}
                    />
                  </TableCell>
                  <TableCell>
                    <GradeTextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]?.nota_final_nf
                      }
                      onChange={(value) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_final_nf",
                          value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        handleOpenDialog(student.fk_aluno_id_aluno)
                      }
                    >
                      Observação
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Adicionar Observação</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              defaultValue={editedGrades[currentStudentId]?.observation || ""}
              onChange={(e) => {
                const observation = e.target.value;
                setEditedGrades((prevGrades) => ({
                  ...prevGrades,
                  [currentStudentId]: {
                    ...prevGrades[currentStudentId],
                    observation: observation,
                  },
                }));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancelar
            </Button>
            <Button
              onClick={() =>
                handleSaveObservation(
                  editedGrades[currentStudentId]?.observation || ""
                )
              }
              color="primary"
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ open: false, message: "" })}
          message={snackbar.message}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000} // Fecha automaticamente após 4 segundos
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Posição da notificação
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Box style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleSaveGrades}>
          Salvar Notas
        </Button>
      </Box>
    </UiAppBar>
  );
};

export default AllStudentGradesPage;
