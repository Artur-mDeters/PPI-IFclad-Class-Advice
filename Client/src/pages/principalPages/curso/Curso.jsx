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
import { useNavigate } from "react-router-dom";

const dataBox = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const Curso = () => {
  const [dataCurso, setDataCurso] = useState([]);

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/cursos/create");
  };

  function redirectToEdit(id) {
    navigate(`/cursos/edit/${id}`);
  }

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
          <Button variant="contained" onClick={redirect}>
            Adicionar Curso
          </Button>
        </SearchBar>
        <Box sx={dataBox}>
          {dataCurso.map((curso) => (
            <Paper
              key={curso.id_curso}
              sx={{
                display: "flex",
                width: "500px",
                height: "300px",
                margin: "15px",
                padding: "20px",
                justifyContent: 'center',
                flexDirection: "column"
              }}
              elevation={8}
            >
              <Typography variant="h4">{curso.nome}</Typography>
              <Box>
                <Button variant="contained" onClick={() => redirectToEdit(curso.id_curso)}>Editar</Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </UiAppBar>
    </ThemeProvider>
  );
};

export default Curso;
