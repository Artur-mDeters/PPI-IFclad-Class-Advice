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
import Theme from "../../../../theme.jsx";
import UiAppBar from "../../../../components/AppBar/AppBar.jsx";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar.jsx";

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
              parcial1: student.parcial1 || "",
              semestre1: student.semestre1 || "",
              parcial2: student.parcial2 || "",
              semestre2: student.semestre2 || "",
              ais_b10: student.ais_b10 || "",
              ppi_b10: student.ppi_b10 || "",
              mostra_de_ciencias: student.mostra_de_ciencias || "",
              faltas: student.faltas || "",
              aia: student.aia || "",
              observacao: student.observacao || "",
              nota_final: student.nota_final || "",
              id: student.id_aluno, // ID do aluno incluído aqui
            };
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
        grades: editedGrades
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
      (field) => student[field] !== undefined && student[field] !== ""
    );
    if (!allGradesFilled) return "--";

    const finalGrade = parseFloat(calculateFinalGrade(studentId));
    const aia = parseFloat(student["aia"] || 0);

    if (finalGrade < 5 && aia) return { label: "REPROVADO", color: "error" };
    if (finalGrade < 7) return { label: "EXAME", color: "warning" };
    return { label: "APROVADO", color: "success" };
  };

  return (
    <Theme>
      <UiAppBar title={`Notas da Turma: ${idTurma}`}>
        <Box sx={{ padding: 3 }}>
          <SearchBar />

          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Disciplina</InputLabel>
            <Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              label="Disciplina"
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

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Aluno</TableCell>
                  <TableCell>Parcial 1</TableCell>
                  <TableCell>Semestre 1</TableCell>
                  <TableCell>Parcial 2</TableCell>
                  <TableCell>Semestre 2</TableCell>
                  <TableCell>AIS</TableCell>
                  <TableCell>PPI</TableCell>
                  <TableCell>Mostra de Ciências</TableCell>
                  <TableCell>Faltas</TableCell>
                  <TableCell>AIA</TableCell>
                  <TableCell>Nota Final</TableCell>
                  <TableCell>Observação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentGrades.map((student, rowIndex) => (
                  <TableRow key={student.id_aluno}>
                    <TableCell>{student.nome}</TableCell>
                    {[
                      "parcial1",
                      "semestre1",
                      "parcial2",
                      "semestre2",
                      "ais_b10",
                      "ppi_b10",
                      "mostra_de_ciencias",
                      "faltas",
                      "aia",
                    ].map((field, colIndex) => (
                      <TableCell key={field}>
                        <TextField
                          value={editedGrades[student.id_aluno]?.[field] || ""}
                          onChange={(e) =>
                            handleGradeChange(
                              student.id_aluno,
                              field,
                              e.target.value
                            )
                          }
                          onBlur={() => handleBlur(student.id_aluno, field)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, rowIndex, colIndex + 1)
                          }
                          variant="standard"
                          inputProps={{
                            maxLength: 4,
                            style: { width: "50px" },
                          }}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      {calculateFinalGrade(student.id_aluno)}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const status = getStatus(student.id_aluno);
                        return status === "--" ? (
                          "--"
                        ) : (
                          <Chip label={status.label} color={status.color} />
                        );
                      })()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleOpenDialog(student.id_aluno)}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              onClick={handleSaveGrades}
              sx={{ marginRight: 2 }}
            >
              Salvar Notas
            </Button>
          </Box>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Editar Observação</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button onClick={handleSaveObservation} variant="contained">
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          >
            <Alert
              onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </UiAppBar>
    </Theme>
  );
};

export default AllStudentGradesPage;