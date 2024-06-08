import { Box, Button, Typography, Paper, CssBaseline, ThemeProvider } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../../components/UI/SearchBar/SearchBar.jsx";
import { useEffect, useState } from "react";

import UiAppBar from "../../../components/AppBar/AppBar";
import { defaultDark } from "../../../themes/themes";

// ? Styles #########################


const boxTurmas = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

import axios from "axios";

const getDataTurmas = async () => {
  const response = await axios.get("http://localhost:3030/turmas");
  try {
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const Turmas = () => {
  const [dataTurmas, setDataTurmas] = useState([]);

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
    console.log(typeof turmas, "turmas");
  });

  return (

    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <UiAppBar>
      <SearchBar>
        <Button variant="contained" sx={{ margin: "0 15px" }}>
          Adicionar Turma
        </Button>
        <Button variant="contained">Agendar Conselho </Button>
      </SearchBar>
      <Box sx={boxTurmas}>
        {dataTurmas.map((turma) => (
          <Paper
            key={turma.id_turma}
            elevation={8}
            sx={{
              display: "flex",
              width: "250px",
              height: "140px",
              margin: "15px",
              padding: "20px",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" mb={5}>
                {turma.nome}
              </Typography>
              <Typography variant="body1">{turma.ano_inicio} Ano</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <a href="/edit"><Button variant="contained">Editar</Button></a>
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
