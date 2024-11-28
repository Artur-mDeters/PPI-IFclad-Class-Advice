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
  Button,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error"); // Tipo: error, warning, info, success

  const [openDialog, setOpenDialog] = useState(false); // Controla o Dialog.
  const [currentStudentId, setCurrentStudentId] = useState(null); // Aluno atual no Dialog.

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleOpenDialog = (idAluno) => {
    setCurrentStudentId(idAluno);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudentId(null);
  };

  const handleSaveObservation = (observation) => {
    setEditedGrades((prevGrades) => ({
      ...prevGrades,
      [currentStudentId]: {
        ...prevGrades[currentStudentId],
        observation: observation, // Salva a observação
      },
    }));
    handleCloseDialog();
  };

  /**
   * ? Atualiza o estado da disciplina selecionada.
   */
  const handleChangeSubject = (event) => {
    setSelectedSubject(event.target.value);
    console.log(selectedSubject);
  };

  /**
   * ? Atualiza a nota de um aluno específico em um campo específico.
   * @param {number} idAluno - ID do aluno.
   * @param {string} campo - Campo de nota a ser atualizado.
   * @param {string} valor - Novo valor da nota.
   */
  const isValidNumber = (value) => !isNaN(value) && value.trim() !== "";

  const handleChangeGrade = (idAluno, campo, valor) => {
    if (campo === "faltas") {
      // Verifica se é um número inteiro válido
      const isInteger = /^[0-9]*$/.test(valor);

      if (!isInteger) {
        setSnackbarMessage(
          "Insira apenas números inteiros no campo de faltas."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    } else {
      // Verifica se é um número válido com no máximo um ponto decimal e até 10
      const isValidNumber = /^[0-9]*(\.[0-9]{0,2})?$/.test(valor);

      if (!isValidNumber || parseFloat(valor) > 10 || parseFloat(valor) < 0) {
        setSnackbarMessage(
          "Insira um número válido entre 0 e 10, usando ponto como separador decimal."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    }

    setEditedGrades((prevGrades) => {
      const updatedGrades = {
        ...prevGrades,
        [idAluno]: {
          ...prevGrades[idAluno],
          [campo]: valor,
        },
      };

      // Atualiza a nota final se necessário
      if (campo !== "faltas") {
        const { nota_primeiro_sem, nota_segundo_sem, exame } =
          updatedGrades[idAluno] || {};
        const finalGrade =
          Number(nota_primeiro_sem || 0) * 0.4 +
          Number(nota_segundo_sem || 0) * 0.6 +
          Number(exame || 0) * 0.1;

        updatedGrades[idAluno].nota_final_nf = finalGrade.toFixed(2);
      }

      return updatedGrades;
    });
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
              pars_primeiro_sem: student.pars_primeiro_sem || null,
              nota_primeiro_sem: student.nota_primeiro_sem || null,
              pars_segundo_sem: student.pars_segundo_sem || null,
              nota_segundo_sem: student.nota_segundo_sem || null,
              nota_ais: student.nota_ais || null,
              nota_ppi: student.nota_ppi || null,
              nota_mostra_de_ciencias: student.nota_mostra_de_ciencias || null,
              faltas: student.faltas || null,
              nota_aia: student.nota_aia || null,
              observation: student.observation || null,
              nota_final_nf: student.nota_final_nf || null,
            };
            return acc;
          }, {});
          setEditedGrades(initialEditedGrades);
          console.error("Notas iniciais:", initialEditedGrades);
        } catch (err) {
          console.error("Erro ao buscar notas:", err);
        }
      }
    };

    fetchGrades();
  }, [selectedSubject, idTurma]);

  /**
   * ? Função para salvar as notas editadas.
   */
  const saveGrades = async (idDisciplina, editedGrades) => {
    for (let idAluno in editedGrades) {
      const grades = editedGrades[idAluno];

      console.log(grades, idAluno);
      try {
        await axios.post(`http://localhost:3030/notas/${idDisciplina}`, {
          idAluno,
          pars_primeiro_sem: grades.pars_primeiro_sem || null,
          nota_primeiro_sem: grades.nota_primeiro_sem || null,
          pars_segundo_sem: grades.pars_segundo_sem || null,
          nota_segundo_sem: grades.nota_segundo_sem || null,
          nota_ais: grades.nota_ais || null,
          nota_ppi: grades.nota_ppi || null,
          faltas: grades.faltas || null,
          nota_final_nf: grades.nota_final_nf || null,
          observation: grades.observation || null,
          nota_mostra_de_ciencias: grades.nota_mostra_de_ciencias || null,
          nota_aia: grades.nota_aia || null,
        });
      } catch (error) {
        console.error("Erro ao salvar notas:", error);
        alert("Erro ao salvar notas!");
      }
    }
  };
  const handleSaveGrades = async () => {
    if (selectedSubject) {
      try {
        await saveGrades(selectedSubject, editedGrades);
        setSnackbar({ open: true, message: "Notas salvas com sucesso!" });
      } catch (err) {
        setSnackbar({ open: true, message: "Erro ao salvar as notas." });
      }
    } else {
      alert("Por favor, selecione uma disciplina e uma turma.");
    }
  };

  /*
  ? Calcula as notas finais dos alunos em uma disciplina especificada.
  \*/
  const calculateFinalGrades = () => {
    const FIRST_SEMESTER_WEIGHT = 0.4;
    const SECOND_SEMESTER_WEIGHT = 0.6;
    const AIA_WEIGHT = 0.4;
    const FINAL_GRADE_THRESHOLD = 7;

    return studentGradesInSubject.map((student) => {
      const {
        pars_primeiro_sem,
        nota_ais,
        nota_primeiro_sem,
        pars_segundo_sem,
        nota_ppi,
        nota_mostra_de_ciencias,
        nota_segundo_sem,
        nota_aia,
      } = editedGrades[student.fk_aluno_id_aluno] || {};

      // Calculate first semester grade
      const notaPrimeiroSem =
        ((Number(pars_primeiro_sem) || 0) * 0.2 +
          (Number(nota_ais) || 0) * 0.3 +
          (Number(nota_primeiro_sem) || 0) * 0.5) *
        FIRST_SEMESTER_WEIGHT;

      // Calculate second semester grade
      const notaSegundoSem =
        ((Number(pars_segundo_sem) || 0) * 0.2 +
          (Number(nota_ppi) || 0) * 0.2 +
          (Number(nota_mostra_de_ciencias) || 0) * 0.2 +
          (Number(nota_segundo_sem) || 0) * 0.5) *
        SECOND_SEMESTER_WEIGHT;

      // Calculate final grade
      const finalGrade = notaPrimeiroSem + notaSegundoSem;

      // Include nota_aia if final grade is below the threshold
      const finalNotaAIA =
        finalGrade < FINAL_GRADE_THRESHOLD && nota_aia != null
          ? (
              finalGrade * (1 - AIA_WEIGHT) +
              Number(nota_aia) * AIA_WEIGHT
            ).toFixed(2)
          : finalGrade.toFixed(2);

      return {
        ...student,
        nota_final_nf: finalNotaAIA, // Final grade rounded to 2 decimal places
      };
    });
  };

  useEffect(() => {
    if (studentGradesInSubject.length > 0) {
      const finalGrades = calculateFinalGrades();
      setStudentGradesInSubject(finalGrades);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedGrades]);

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
