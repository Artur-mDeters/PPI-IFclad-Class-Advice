import UiAppBar from "../../../components/AppBar/AppBar";
import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Paper,
  Typography,
} from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import { defaultDark } from "../../../themes/themes";
import { useEffect, useState } from "react";
import getDataCursos from "./core/GetDataCuros";


const dataBox = {
  display: "flex",
  with: "100%",
};

const Curso = () => {
  const [dataCurso, setDataCurso] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataCursos();
        console.log(result);
        setDataCurso(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  
  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <UiAppBar>
        <SearchBar>
          <Button variant="contained">Adicionar Curso</Button>
        </SearchBar>
        <Box sx={dataBox}>
          {dataCurso.map((curso) => (
            <Paper
              key={curso.id_curso}
              sx={{
                display: "flex",
                width: "500px",
                height: "400px",
                margin: "15px",
                padding: "20px",
                justifyContent: 'center',
                alignItems: 'center'
              }}
              elevation={8}
            >
              <Typography variant="h4">{curso.nome}</Typography>
            </Paper>
          ))}
        </Box>
      </UiAppBar>
    </ThemeProvider>
  );
};

export default Curso;
