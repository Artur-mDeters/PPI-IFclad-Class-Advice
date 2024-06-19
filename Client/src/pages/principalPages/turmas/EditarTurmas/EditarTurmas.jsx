import {
  Box,
  Typography,
  TextField,
  ThemeProvider,
  CssBaseline,
  Button,
} from "@mui/material";
import { defaultDark } from "../../../../themes/themes";
import { useNavigate } from "react-router-dom";
import classes from "../styles/EditarTurmas";


const EditarTurmas = () => {

  const navigate = useNavigate()

  const saveAndRedirect = () => {
    navigate('/turmas')
  }

  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <Box
        sx={classes.principalBox}
      >
        <Box
          sx={classes.topCard}
        >
          <Typography variant="h3">Editar turmas</Typography>
        </Box>
        <Box
          sx={classes.boxComponents}
        >
          <Box sx={classes.typographyBox}>
            <Typography marginBottom="20px" variant="h4">Altere os parametros desejados</Typography>
            <Typography variant="body1">
              Lembre-se de salvar antes de sair da página
            </Typography>
          </Box>
          <Box sx={classes.boxCentralize}>
            <Box
              sx={classes.textFieldBox}
            >
              <TextField id="name" label="Nome" variant="filled" />
              <TextField id="ano" label="Ano de início" variant="filled" />
            </Box>
            <Box sx={classes.buttonBox}>
              <Button sx={{ marginRight: '20px'}} size="large" variant="contained" onClick={saveAndRedirect}>‎ ‎ ‎ Salvar ‎ ‎ ‎ </Button>
              <Button color="error" size="large" variant="contained">
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