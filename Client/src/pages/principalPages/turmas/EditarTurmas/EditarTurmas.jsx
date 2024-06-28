import {
  Box,
  Typography,
  TextField,
  ThemeProvider,
  CssBaseline,
  Button,
} from "@mui/material";
import { defaultDark } from "../../../../themes/themes";
import { redirect, useNavigate, useParams } from "react-router-dom";
import classes from "../styles/EditarTurmas";
import { useEffect, useState } from "react";
import GetDataTurmasById from "../core/GetDataTurmasById";
import axios from "axios";

// eslint-disable-next-line react-hooks/exhaustive-deps

const EditarTurmas = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      try {
        const result = await GetDataTurmasById(id);
        setData(...result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const saveAndRedirect = () => {
    axios
      .put("http://localhost:3030/turmas/editar/"+id, {
        nome: data.nome,
        ano_inicio: data.ano_inicio
      })
      .then((response) => {
        console.log(response);
        navigate("/turmas");
      })
      .catch((err) => {
        console.error(err);
      });
    
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <Box sx={classes.principalBox}>
        <Box sx={classes.topCard}>
          <Typography variant="h3">Editar turmas</Typography>
        </Box>
        <Box sx={classes.boxComponents}>
          <Box sx={classes.typographyBox}>
            <Typography marginBottom="20px" variant="h4">
              Altere os parâmetros desejados
            </Typography>
            <Typography variant="body1">
              Lembre-se de salvar antes de sair da página
            </Typography>
          </Box>
          <Box sx={classes.boxCentralize}>
            <Box sx={classes.textFieldBox}>
              <TextField
                id="nome"
                label="Nome"
                variant="filled"
                value={data.nome}
                onChange={handleChange}
              />
              <TextField
                id="ano_inicio"
                label="Ano de início"
                variant="filled"
                value={data.ano_inicio}
                onChange={handleChange}
              />
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
              <Button color="error" size="large" variant="contained" onClick={() => navigate("/turmas")}>
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
export default EditarTurmas;
