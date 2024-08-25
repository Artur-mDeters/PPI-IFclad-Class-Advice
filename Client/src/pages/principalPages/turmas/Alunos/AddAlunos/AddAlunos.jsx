import UiAppBar from "../../../../../components/AppBar/AppBar"
import { Box, Typography, Divider, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, styled, Paper, Button, TextField, Alert } from "@mui/material"
import classes from "./style/style"
import { tableCellClasses } from '@mui/material/TableCell';
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// TODO: inserção dos alunos na tabela por um formulário

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AddAlunos = () => {
  const { idTurma } = useParams()
  const [alert, setAlert] = useState(false)
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [interno, setInterno] = useState("");
  const [foto, setFoto] = useState("");

  const navigate = useNavigate()

  const addItem = () => {
    
    if (interno == "s") {
      setInterno(true)
    } else {
      setInterno(false)
    }
    const newRow = {
      name,
      matricula,
      email,
      sexo,
      dataNascimento,
      cidade,
      uf,
      interno,
      foto
    };

    setRows([...rows, newRow]);

    // Limpar os campos após adicionar
    setName("");
    setMatricula("");
    setEmail("");
    setSexo("");
    setDataNascimento("");
    setCidade("");
    setUf("");
    setInterno("");
    setFoto("");

    console.log(rows)
  };

  const saveAndRedirect = async () => {
    try {
      for (const aluno of rows) {
        console.log(aluno.name == "")
        if (aluno.name == "") {
          setAlert(true)
        } else {
          const response = await axios.post('http://localhost:3030/alunos', {
            nome: aluno.name,
            matricula: aluno.matricula,
            email: aluno.email,
            sexo: aluno.sexo,
            nascimento: aluno.dataNascimento,
            cidade: aluno.cidade,
            uf: aluno.uf,
            interno: aluno.interno,
            fk_turma_id_turma: idTurma
          });
          console.log(response);
          navigate("../turmas/alunos/"+idTurma)
        }

      }
      
    } catch (err) {
      console.error(err);
    }
  }

  const handleCancel = () => {
    navigate("../turmas/alunos/"+idTurma)
  }

  return (
    <UiAppBar>
      <Box sx={classes.boxTitle}>
        <Typography variant="h3" align="center">Insira as informações sobre os alunos</Typography>
        <Typography variant="subtitle1" align="center" marginBottom="15px">Confira se as informações estão corretas antes de salvar</Typography>
        <Divider />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>NOME COMPLETO</StyledTableCell>
                <StyledTableCell align="center">MATRICULA</StyledTableCell>
                <StyledTableCell align="center">EMAIL</StyledTableCell>
                <StyledTableCell align="center">SEXO</StyledTableCell>
                <StyledTableCell align="center">DATA DE NASCIMENTO</StyledTableCell>
                <StyledTableCell align="center">CIDADE</StyledTableCell>
                <StyledTableCell align="center">UF</StyledTableCell>
                <StyledTableCell align="center">INTERNO</StyledTableCell>
                <StyledTableCell align="center">FOTO</StyledTableCell>
                {/* <StyledTableCell align="center">CONFIRMAR</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.matricula}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.sexo}</StyledTableCell>
                  <StyledTableCell align="right">{row.dataNascimento}</StyledTableCell>
                  <StyledTableCell align="right">{row.cidade}</StyledTableCell>
                  <StyledTableCell align="right">{row.uf}</StyledTableCell>
                  <StyledTableCell align="right">{row.interno}</StyledTableCell>
                  <StyledTableCell align="right">{row.foto}</StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={name} onChange={(e) => setName(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={sexo} onChange={(e) => setSexo(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={uf} onChange={(e) => setUf(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={interno} onChange={(e) => setInterno(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField variant="standard" value={foto} onChange={(e) => setFoto(e.target.value)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained" onClick={addItem}>OK</Button>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Button variant="contained" onClick={saveAndRedirect}>Salvar</Button>
        <Button variant="contained" onClick={handleCancel} color="error">Cancelar</Button>
      </Box>
    {alert == true? <Alert severity="warning">insere os valores ai</Alert> : null}
    </UiAppBar>
  );
};

export default AddAlunos;
