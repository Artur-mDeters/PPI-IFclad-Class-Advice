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
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import { use } from "../../../../../../Server/src/routes/grades.routes";

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
              pars_primeiro_sem: student.pars_primeiro_sem || "",
              nota_primeiro_sem: student.nota_primeiro_sem || "",
              pars_segundo_sem: student.pars_segundo_sem || "",
              nota_segundo_sem: student.nota_segundo_sem || "",
              faltas: student.faltas || "",
              nota_parcial_np: student.nota_parcial_np || "",
              exame: student.exame || "",
              nota_final_nf: student.nota_final_nf || "",
              observation: student.observation || "",
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
          nota_parcial_np: grades.nota_parcial_np || null,
          faltas: grades.faltas || null,
          exame: grades.exame || null,
          nota_final_nf: grades.nota_final_nf || null,
          observation: grades.observation || null,
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
    return studentGradesInSubject.map((student) => {
      const { nota_primeiro_sem, nota_segundo_sem, exame } =
        editedGrades[student.fk_aluno_id_aluno] || {};
      const finalGrade =
        Number(nota_primeiro_sem || 0) * 0.4 +
        Number(nota_segundo_sem || 0) * 0.6 +
        Number(exame || 0) * 0.1;

      return {
        ...student,
        nota_final_nf: finalGrade.toFixed(2), // Arredonda para 2 casas decimais
      };
    });
  };

  useEffect(() => {
    if (studentGradesInSubject.length > 0) {
      const finalGrades = calculateFinalGrades();
      setStudentGradesInSubject(finalGrades);
    }
  }, [editedGrades]);

  return (
    <UiAppBar title={"Notas da turma: ${idTurma}"}>
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
                <TableCell>Faltas</TableCell>
                <TableCell>Nota Parcial</TableCell>
                <TableCell>Exame</TableCell>
                <TableCell>Nota Final</TableCell>
                <TableCell>Observação</TableCell>
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
                          ?.pars_primeiro_sem || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "pars_primeiro_sem",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        const invalidKeys = ["e", "E", "+", "-", ","]; // Bloqueia caracteres inválidos.
                        if (invalidKeys.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
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
                      onKeyDown={(e) => {
                        const invalidKeys = ["e", "E", "+", "-", ","]; // Bloqueia caracteres inválidos.
                        if (invalidKeys.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.pars_segundo_sem || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "pars_segundo_sem",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        const invalidKeys = ["e", "E", "+", "-", ","]; // Bloqueia caracteres inválidos.
                        if (invalidKeys.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
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
                      onKeyDown={(e) => {
                        const invalidKeys = ["e", "E", "+", "-", ","]; // Bloqueia caracteres inválidos.
                        if (invalidKeys.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]?.faltas || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} // Apenas números inteiros
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "faltas",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>

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
                      onKeyDown={(e) => {
                        const invalidKeys = ["e", "E", "+", "-", ","]; // Bloqueia caracteres inválidos.
                        if (invalidKeys.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]?.exame || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "exame",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        const invalidKeys = ["e", "E", "+", "-", ","]; // Bloqueia caracteres inválidos.
                        if (invalidKeys.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedGrades[student.fk_aluno_id_aluno]
                          ?.nota_final_nf || ""
                      }
                      size="small"
                      style={{ width: "80px" }}
                      onChange={(e) =>
                        handleChangeGrade(
                          student.fk_aluno_id_aluno,
                          "nota_final_nf",
                          e.target.value
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