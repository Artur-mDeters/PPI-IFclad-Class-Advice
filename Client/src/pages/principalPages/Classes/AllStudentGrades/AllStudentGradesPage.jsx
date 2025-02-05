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
  const [nomeTurma, setNomeTurma] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/turmas/disciplinas/" + idTurma
        );
        console.log(response)
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
    const fetchNomeTurma = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/turmas/${idTurma}`);
        setNomeTurma(response.data.nome);
      } catch (error) {
        console.error("Erro ao buscar o nome da turma:", error);
      }
    };

    fetchNomeTurma();
  }, [idTurma]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/disciplina`);
        setSubjects(response.data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
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
              aia: student.aia || "",
              observacao: student.observacao || "",
            };
            return acc;
          }, {});

          setEditedGrades(initialEditedGrades);
        } catch (error) {
          console.error("Erro ao buscar notas:", error);
        }
      }
    };

    fetchGrades();
  }, [idTurma, selectedSubject]);

  const handleGradeChange = (studentId, field, value) => {
    setEditedGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const calculateFinalGrade = (studentId) => {
    const student = editedGrades[studentId];
    if (!student) return 0;

    const { parcial1, semestre1, parcial2, semestre2, ais_b10, ppi_b10, mostra_de_ciencias, aia } = student;

    const grades = [
      parseFloat(parcial1) || 0,
      parseFloat(ais_b10) || 0,
      parseFloat(semestre1) || 0,
      parseFloat(parcial2) || 0,
      parseFloat(mostra_de_ciencias) || 0,
      parseFloat(ppi_b10) || 0,
      parseFloat(semestre2) || 0,
    ];

    let finalGrade = (((grades[0]* 0.2)+(grades[1]* 0.3) + (grades[2]*0.5))*0.4) + (((grades[3]* 0.2)+(grades[4]* 0.1) + (grades[5]*0.2) + (grades[6]*0.5))*0.6);
    if (!aia){
      return finalGrade.toFixed(1);
    } else{
      finalGrade = (finalGrade * 0.6) + (parseFloat(aia) * 0.4);
      return finalGrade.toFixed(1);
    }
  };

  const getStatus = (studentId) => {
    const student = editedGrades[studentId];
    const requiredFields = [
      "parcial1",
      "semestre1",
      "ais_b10",
      "parcial2",
      "semestre2",
      "mostra_de_ciencias",
      "ppi_b10",
    ];

    const allGradesFilled = requiredFields.every(
      (field) => student[field] !== undefined && student[field] !== ""
    );
    if (!allGradesFilled) return "--";

    const finalGrade = parseFloat(calculateFinalGrade(studentId));
    const aia = parseFloat(student["aia"] || 0);

    if (finalGrade < 5 && aia) return { label: "REPROVADO", color: "error" };
    if (finalGrade < 7 && !aia) return { label: "EXAME", color: "warning" };
    return { label: "APROVADO", color: "success" };
  };

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
    const number = parseFloat(value);
    if (isNaN(number) || number > 999) return ""; // Restrição para números acima de 999
  
    let formattedNumber;
    if (number <= 9) {
      formattedNumber = number.toFixed(1); // Mantém o formato correto para números pequenos
    } else if (number == 10) {
      formattedNumber = number.toFixed(1); // Mantém o formato correto para números pequenos
    } else if (number <= 99) {
      formattedNumber = (number / 10).toFixed(1); // Divide por 10 para notas entre 10 e 99
    } else {
      formattedNumber = (number / 100).toFixed(2); // Divide por 100 para notas a partir de 100
    }
  
    // Arredondamento
    const roundedNumber = Math.round(parseFloat(formattedNumber) * 10) / 10;
    return roundedNumber.toFixed(1);
  };

  const formatFaltas = (value) => {
    const number = parseInt(value, 10);
    if (isNaN(number)) return "";
    return Math.min(Math.max(number, 0), 9999);
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


    const fetchNomeTurma = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/turmas/${idTurma}`);
        setNomeTurma(response.data[0].nome);
      } catch (error) {
        console.error("Erro ao buscar o nome da turma:", error);
      }
    };

    fetchNomeTurma();
  }, [idTurma]);

  

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
              id_aluno: student.id_aluno, // ID do aluno incluído aqui
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

  return (
    <Theme>
      <UiAppBar title={`Notas da Turma ${nomeTurma}`}>
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
                  {subject.nome_disciplina}
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
                  <TableCell>AIS</TableCell>
                  <TableCell>Parcial 2</TableCell>
                  <TableCell>Semestre 2</TableCell>
                  <TableCell>Mostra de Ciências</TableCell>
                  <TableCell>PPI</TableCell>
                  <TableCell>Faltas</TableCell>
                  <TableCell>AIA</TableCell>
                  <TableCell>Nota Final</TableCell>
                  <TableCell>Situação</TableCell>
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
                      "ais_b10",
                      "parcial2",
                      "semestre2",
                      "mostra_de_ciencias",
                      "ppi_b10",
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
              <Button onClick={handleCloseDialog} color="error" variant="contained">Cancelar</Button>
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
