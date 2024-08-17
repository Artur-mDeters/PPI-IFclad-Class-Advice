import {
  Box,
  Button,
  Typography,
  Paper,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../../components/UI/SearchBar/SearchBar.jsx";
import { useEffect, useState } from "react";

import UiAppBar from "../../../components/AppBar/AppBar";
import { defaultLight } from "../../../themes/themes";

import { useNavigate } from "react-router-dom";
import getDataTurmas from "./core/GetDataTurmas.jsx";
import classes from "./style/Turma.js";

// ? Styles #########################

const Turmas = () => {
  const [dataTurmas, setDataTurmas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataTurmas();
        setDataTurmas(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    console.log(typeof dataTurmas, "data turmas");
    console.log(dataTurmas, "turmas");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function redirect(id) {
    navigate(`editar/${id}`);
  }

  function redirectCreateTurma() {
    navigate("create");
  }

  function redir(id) {
    navigate(`/turmas/alunos/`+id)
  }

  return (
    <ThemeProvider theme={defaultLight}>
      <CssBaseline />
      <UiAppBar>
        <SearchBar sx={classes.searchbar}>
          <Button
            variant="contained"
            sx={classes.buttonAddTurma}
            onClick={redirectCreateTurma}
          >
            Adicionar Turma
          </Button>
          
        </SearchBar>
        <Box sx={classes.boxTurmas}>
          {dataTurmas.map((turma) => (
            <Paper key={turma.id_turma} elevation={8} sx={classes.paperTurma}>
              <Box sx={classes.flex1} onClick={() => redir(turma.id_turma)}>
                <Typography variant="h4" mb={5}>
                  {turma.nome}
                </Typography>
                <Typography variant="body1">Ano: {turma.ano_inicio}</Typography>
              </Box>
              <Box sx={classes.buttonBoxPaper}>
                <Button
                  variant="contained"
                  onClick={() => {
                    redirect(turma.id_turma);
                  }}
                >
                  Editar
                </Button>
                <Button variant="contained">Notas</Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </UiAppBar>
    </ThemeProvider>
  );
};

export default Turmas;
