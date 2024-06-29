import {
  Box,
  Typography,
  ThemeProvider,
  CssBaseline,
  Button,
} from "@mui/material";
import { defaultDark } from "../../../../themes/themes";
import { useNavigate } from "react-router-dom";
import classes from "../styles/EditarTurmas";
import { useState } from "react";
// import GetDataTurmasById from "../core/GetDataTurmasById";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// eslint-disable-next-line react-hooks/exhaustive-deps

const CreateTurmas = () => {
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");

  const navigate = useNavigate();

  const saveAndRedirect = () => {
    axios
      .post("http://localhost:3030/turmas/", {
        nome: nome,
        ano_inicio: ano,
      })
      .then((response) => {
        console.log(response);
        navigate("/turmas");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleNome = (e) => {
    const value = e.target.value;
    setNome(value);
  };
  const handleAno = (e) => {
    const value = e.target.value;
    setAno(value);
  };

  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <Box sx={classes.principalBox}>
        <Box sx={classes.topCard}>
          <Typography variant="h3">Criar turma</Typography>
        </Box>
        <Box sx={classes.boxComponents}>
          <Box sx={classes.typographyBox}>
            <Typography marginBottom="20px" variant="h4">
              Insira os parâmetros desejados
            </Typography>
            <Typography variant="body1">
              Lembre-se de salvar antes de sair da página
            </Typography>
          </Box>
          <Box sx={classes.boxCentralize}>
            <Box sx={classes.textFieldBox}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Nome</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="nome"
                  label="Nome"
                  onChange={handleNome}
                  value={nome}
                >
                  <MenuItem value={"T11"}>T11</MenuItem>
                  <MenuItem value={"T12"}>T12</MenuItem>
                  <MenuItem value={"T13"}>T13</MenuItem>
                  <MenuItem value={"T14"}>T14</MenuItem>
                  <MenuItem value={"T15"}>T15</MenuItem>
                  <MenuItem value={"T21"}>T21</MenuItem>
                  <MenuItem value={"T22"}>T22</MenuItem>
                  <MenuItem value={"T23"}>T23</MenuItem>
                  <MenuItem value={"T24"}>T24</MenuItem>
                  <MenuItem value={"T25"}>T25</MenuItem>
                  <MenuItem value={"T31"}>T31</MenuItem>
                  <MenuItem value={"T32"}>T32</MenuItem>
                  <MenuItem value={"T33"}>T33</MenuItem>
                  <MenuItem value={"T34"}>T34</MenuItem>
                  <MenuItem value={"T35"}>T35</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="ano">Ano de Início</InputLabel>
                <Select
                  labelId="ano"
                  label="Ano de Início"
                  id="ano_inicio"
                  onChange={handleAno}
                  value={ano}
                >
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={classes.buttonBox}>
              <Button
                sx={{ marginRight: "20px" }}
                size="large"
                variant="contained"
                onClick={saveAndRedirect}
              >
                ‎ ‎ ‎ Salvar ‎ ‎ ‎{" "}
              </Button>
              <Button
                color="error"
                size="large"
                variant="contained"
                onClick={() => navigate("/turmas")}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

// ‎ Caractere invisível
export default CreateTurmas;
