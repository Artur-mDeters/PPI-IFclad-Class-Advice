// * Importação de dependências e componentes necessários
import UiAppBar from "../../../../../components/AppBar/AppBar";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  styled,
  Paper,
  Button,
  TextField,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./AddStudentPage.Style";

// * Função para estilizar células da tabela
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// * Função para estilizar linhas da tabela
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// * Função de validação dos dados do aluno
const validateStudent = (student) => {
  const errors = {};  // Armazena os erros de validação

  if (/[^a-zA-Z\s]/.test(student.name)) errors.name = "Nome não pode conter números";
  if (!/^\d+$/.test(student.registration)) errors.registration = "Matrícula deve conter apenas números";
  if (!student.email.includes("@")) errors.email = "Email deve conter um '@'";
  if (!["masculino", "feminino"].includes(student.gender.toLowerCase())) errors.gender = "Gênero deve ser 'masculino' ou 'feminino'";
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(student.dateOfBirth)) errors.dateOfBirth = "Data de nascimento deve estar no formato dd/mm/aaaa";
  if (/[\d]/.test(student.city)) errors.city = "Cidade não pode conter números";
  if (!/^[A-Z]{2}$/.test(student.federativeUnity)) errors.federativeUnity = "UF deve conter duas letras maiúsculas";

  return errors;
};

// * Componente de adição e edição de alunos
const AddStudentPage = () => {
  const { idTurma } = useParams();  // Pega o parâmetro da URL (id da turma)
  const [alert, setAlert] = useState(false);  // Estado de alerta
  const [alertMessage, setAlertMessage] = useState("");  // Mensagem do alerta
  const [alertCountdown, setAlertCountdown] = useState(5);  // Contagem regressiva do alerta
  const [rows, setRows] = useState([]);  // Linhas da tabela
  const [student, setStudent] = useState({  // Dados do aluno sendo adicionado ou editado
    name: "",
    registration: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    federativeUnity: "",
    internal: "",
    course: "",
  });
  const [editingRowIndex, setEditingRowIndex] = useState(null);  // Índice da linha sendo editada
  const [openCancelDialog, setOpenCancelDialog] = useState(false);  // Estado para o diálogo de cancelamento
  const [courseYear, setCourseYear] = useState([]);  // Ano do curso

  const navigate = useNavigate();  // Função para navegação entre páginas

  // * Função para pegar o ano do curso via API
  const getCourseYear = async () => {
    const response = await axios.get("http://localhost:3030/turmas/" + idTurma);
    return response.data;
  };

  // * Hook para configurar dados iniciais
  useEffect(() => {
    let timer;
    if (alertCountdown > 0 && alert) {
      timer = setInterval(() => {
        setAlertCountdown((prev) => prev - 1);
      }, 1000);
    } else if (alertCountdown === 0) {
      setAlert(false);
      setAlertCountdown(5);
    }
    return () => clearInterval(timer);  // Limpeza do intervalo ao desmontar o componente
  }, [alert, alertCountdown]);

  // * Hook para buscar dados do curso uma única vez
  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getCourseYear();
        setCourseYear(result);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseYear]);

  // * Função de manipulação de alteração nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "dateOfBirth") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 8);
      formattedValue = digitsOnly;
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
      }
      if (formattedValue.length > 5) {
        formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(5)}`;
      }
    } else if (name === "registration") {
      formattedValue = value.replace(/[^\d]/g, "");
    } else if (name === "federativeUnity") {
      formattedValue = value.toUpperCase();
    }

    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: formattedValue,
      course: idTurma,
    }));
  };

  // * Função para adicionar ou editar um aluno na tabela
  const addItem = () => {
    const errors = validateStudent(student);
    if (Object.keys(errors).length > 0) {
      setAlertMessage(Object.values(errors).join("  |  "));
      setAlert(true);
      return;
    }

    const newRow = {
      ...student,
      internal: student.internal === "sim" ? "Sim" : "Não", 
    };

    if (editingRowIndex !== null) {
      const updatedRows = rows.map((row, index) =>
        index === editingRowIndex ? newRow : row
      );
      setRows(updatedRows);
      setEditingRowIndex(null);
    } else {
      setRows([...rows, newRow]);
    }

    setStudent({
      name: "",
      registration: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      city: "",
      federativeUnity: "",
      internal: "",
      course: "",
    });
  };

  // * Função para preparar edição de um aluno na tabela
  const handleEdit = (index) => {
    const rowToEdit = rows[index];
    setStudent({
      name: rowToEdit.name,
      registration: courseYear[0]?.ano_inicio + rowToEdit.registration,
      email: rowToEdit.email,
      gender: rowToEdit.gender,
      dateOfBirth: rowToEdit.dateOfBirth,
      city: rowToEdit.city,
      federativeUnity: rowToEdit.federativeUnity,
      internal: rowToEdit.internal ? "sim" : "não",
      course: idTurma,
    });
    setEditingRowIndex(index);
  };

  // * Função para salvar os dados e redirecionar
  const saveAndRedirect = async () => {
    try {
      let hasError = false;

      // Verifica se há erros em cada aluno
      for (const aluno of rows) {
        const errors = validateStudent(aluno);
        if (Object.keys(errors).length > 0) {
          setAlertMessage(Object.values(errors).join(" | "));
          setAlert(true);
          hasError = true;
          break;
        }
      }

      // Envia dados para o servidor se não houver erros
      if (!hasError) {
        const responses = await Promise.all(
          rows.map((aluno) =>
            axios.post("http://localhost:3030/alunos", {
              name: aluno.name,
              registration: courseYear[0]?.ano_inicio + aluno.registration,
              email: aluno.email,
              gender: aluno.gender,
              dateOfBirth: aluno.dateOfBirth,
              city: aluno.city,
              federativeUnity: aluno.federativeUnity,
              internal: aluno.internal,
              course: aluno.course,
            })
          )
        );

        console.log(responses);
        navigate("../turmas/" + idTurma + "/alunos/");
      } else {
        setTimeout(() => {
          setAlert(false);
          setAlertCountdown(5);
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      setAlertMessage("Ocorreu um erro ao salvar os dados");
      setAlert(true);
    }
  };

  const handleCancel = () => {
    setOpenCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    setOpenCancelDialog(false);
    navigate("../turmas/" + idTurma + "/alunos/");
  };

  const handleCancelClose = () => {
    setOpenCancelDialog(false);
  };

  return (
    <UiAppBar title={"Adicionar Alunos"}>
      <Box sx={classes.boxTitle}>
        <Typography variant="h3" align="center">
          Insira as informações sobre os alunos
        </Typography>
        <Typography variant="subtitle1" align="center" marginBottom="15px">
          Confira se as informações estão corretas antes de salvar
        </Typography>
        <Divider />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>NOME COMPLETO</StyledTableCell>
                <StyledTableCell align="center">MATRICULA</StyledTableCell>
                <StyledTableCell align="center">EMAIL</StyledTableCell>
                <StyledTableCell align="center">GÊNERO</StyledTableCell>
                <StyledTableCell align="center">
                  DATA DE NASCIMENTO
                </StyledTableCell>
                <StyledTableCell align="center">CIDADE</StyledTableCell>
                <StyledTableCell align="center">UF</StyledTableCell>
                <StyledTableCell align="center">INTERNO</StyledTableCell>
                <StyledTableCell align="center">AÇÕES</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center" name="name">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {courseYear[0]?.ano_inicio + row.registration}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.gender}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.dateOfBirth}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.city}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.federativeUnity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.internal ? "Sim" : "Não"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(index)}
                    >
                      Editar
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <StyledTableCell align="right">
                  <TextField
                    name="name"
                    variant="standard"
                    value={student.name}
                    onChange={handleChange}
                    error={!!student.errors?.name}
                    helperText={student.errors?.name}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    name="registration"
                    id="registration"
                    variant="standard"
                    value={student.registration}
                    onChange={handleChange}
                    error={!!student.errors?.registration}
                    helperText={student.errors?.registration}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {courseYear[0]?.ano_inicio + " - "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    name="email"
                    id="email"
                    variant="standard"
                    value={student.email}
                    onChange={handleChange}
                    error={!!student.errors?.email}
                    helperText={student.errors?.email}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FormControl variant="standard" fullWidth>
                    <Select
                      labelId="gender-label"
                      name="gender"
                      value={student.gender}
                      onChange={handleChange}
                      error={!!student.errors?.gender}
                      label="Gênero"
                    >
                      <MenuItem value="masculino">Masculino</MenuItem>
                      <MenuItem value="feminino">Feminino</MenuItem>
                    </Select>
                    <FormHelperText>{student.errors?.gender}</FormHelperText>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    name="dateOfBirth"
                    variant="standard"
                    value={student.dateOfBirth}
                    onChange={handleChange}
                    error={!!student.errors?.dateOfBirth}
                    helperText={student.errors?.dateOfBirth}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    name="city"
                    id="city"
                    variant="standard"
                    value={student.city}
                    onChange={handleChange}
                    error={!!student.errors?.city}
                    helperText={student.errors?.city}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    name="federativeUnity"
                    variant="standard"
                    id="federativeUnity"
                    value={student.federativeUnity}
                    onChange={handleChange}
                    error={!!student.errors?.federativeUnity}
                    helperText={student.errors?.federativeUnity}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FormControl variant="standard" fullWidth>
                    <Select
                      labelId="internal-label"
                      name="internal"
                      value={student.internal}
                      onChange={handleChange}
                      error={!!student.errors?.internal}
                    >
                      <MenuItem value="sim">Sim</MenuItem>
                      <MenuItem value="não">Não</MenuItem>
                    </Select>
                    <FormHelperText>{student.errors?.internal}</FormHelperText>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained" onClick={addItem}>
                    {editingRowIndex !== null ? "Atualizar" : "OK"}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={classes.boxButton}>
        <Button variant="contained" onClick={saveAndRedirect}>
          Salvar
        </Button>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancelar
        </Button>
      </Box>
      <Dialog open={openCancelDialog} onClose={handleCancelClose}>
        <DialogTitle>Cancelar</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Você tem certeza de que deseja cancelar? Todas as informações não
            salvas serão perdidas.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} variant="contained">
            Voltar
          </Button>
          <Button
            onClick={handleCancelConfirm}
            variant="contained"
            color="error"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      {alert && (
        <Alert severity="error" onClose={() => setAlert(false)}>
          {alertMessage}
        </Alert>
      )}
    </UiAppBar>
  );
};

export default AddStudentPage;
