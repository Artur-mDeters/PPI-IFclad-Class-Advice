import {
  Button,
  Box,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import UiAppBar from "../../../../components/AppBar/AppBar";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import padrao from "./fotos/padrao.png";
import classes from "./StudentPage.Style";

const StudentPage = () => {
  const [dataAluno, setDataAluno] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [notification, setNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false); // Nova variável de erro
  const [selectedDate, setSelectedDate] = useState(""); // Inicializa selectedDate como string vazia
  const { idTurma } = useParams();
  const navigate = useNavigate();

  const saveClassCouncil = async () => {
    if (!selectedDate) {
      console.error("Data não selecionada");
      setErrorNotification(true); // Exibe notificação de erro
      return;
    }

    // Verifica se a data selecionada é no futuro
    const currentDate = new Date();
    const councilDate = new Date(selectedDate);
    if (councilDate < currentDate) {
      console.error("A data não pode ser no passado");
      setErrorNotification(true); // Exibe notificação de erro
      return;
    }

    try {
      const formattedDate = councilDate.toISOString().split("T")[0];

      const response = await axios.put(
        `http://localhost:3030/turmas/conselho/${idTurma}`,
        { conselho: formattedDate }
      );

      setNotification(true); // Exibe notificação de sucesso
      handleCloseDialog();
      return response.data;
    } catch (err) {
      console.error("Erro ao salvar o conselho de classe:", err);
      setErrorNotification(true); // Exibe notificação de erro
    }
  };

  const redirectToAddStudent = () => {
    navigate("AddAlunos/");
  };

  const redirectToEditStudent = (id) => {
    navigate("./EditAluno/" + id);
  };

  const redirectToStudentGradesPage = (id) => {
    navigate("/" + id + "/notas");
  };

  const redirectToAllStudentsGradesPage = () => {
    navigate("/" + idTurma + "/notasTurma");
  };

  const redirectToPDFGradesPage = () => {
    navigate("/" + idTurma + "/pareceres");
  };
  const getDataAlunos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/" + idTurma + "/alunos/"
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataAlunos();
        setDataAluno(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTurma]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseNotification = () => {
    setNotification(false);
  };

  const handleCloseErrorNotification = () => {
    setErrorNotification(false);
  };

  return (
    <UiAppBar title={"Turma:"}>
      <SearchBar>
        <Button
          variant="contained"
          sx={{ marginRight: "15px" }}
          onClick={redirectToAddStudent}
        >
          Adicionar Alunos
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: "15px" }}
          onClick={redirectToAllStudentsGradesPage}
        >
          Notas da Turma
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: "15px" }}
          onClick={handleOpenDialog}
        >
          Agendar Conselho de Classe
        </Button>
        <Button variant="contained" onClick={redirectToPDFGradesPage}>
          Gerar pareceres
        </Button>
      </SearchBar>
      <Box sx={classes.boxAlunos}>
        {dataAluno &&
          dataAluno.map((aluno) => (
            <Paper key={aluno.id_aluno} elevation={8} sx={classes.paperAluno}>
              <Box onClick={() => redirectToEditStudent(aluno.id_aluno)}>
                <Box sx={classes.foto}>
                  <Avatar
                    src={
                      aluno.foto_path
                        ? `http://localhost:3030/fotos/${aluno.foto_path}`
                        : padrao
                    }
                    alt={aluno.nome}
                    sx={{
                      width: 160,
                      height: 160,
                      borderRadius: "5px",
                    }}
                  >
                    {!aluno.foto_path && aluno.nome?.charAt(0).toUpperCase()}
                  </Avatar>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{aluno.nome}</Typography>
                </Box>
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => redirectToStudentGradesPage(aluno.id_aluno)}
                >
                  Ver Notas
                </Button>
              </Box>
            </Paper>
          ))}
      </Box>

      {/* Dialog para agendar conselho de classe */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Agendar Conselho de Classe</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            fullWidth
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={saveClassCouncil}
            variant="contained"
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificação de sucesso */}
      <Snackbar
        open={notification}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          sx={{ width: "100%" }}
        >
          Conselho de classe agendado com sucesso!
        </Alert>
      </Snackbar>

      {/* Snackbar para notificação de erro */}
      <Snackbar
        open={errorNotification}
        autoHideDuration={4000}
        onClose={handleCloseErrorNotification}
      >
        <Alert
          onClose={handleCloseErrorNotification}
          severity="error"
          sx={{ width: "100%" }}
        >
          Ocorreu um erro! Verifique a data ou tente novamente mais tarde.
        </Alert>
      </Snackbar>
    </UiAppBar>
  );
};

export default StudentPage;
