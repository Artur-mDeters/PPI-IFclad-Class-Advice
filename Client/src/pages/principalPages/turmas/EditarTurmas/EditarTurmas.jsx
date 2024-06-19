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


const EditarTurmas = () => {

  const navigate = useNavigate()

  const saveAndRedirect = () => {
    navigate('/turmas')
  }

  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "60px",
            backgroundColor: "#5d1c8b",
          }}
        >
          <Typography variant="h3">Editar turmas</Typography>
        </Box>
        <Box
          sx={{
            width: "50%",
            margin: "auto",
            borderLeft: "1px solid #222",
            borderBottom: "1px solid #222",
            borderRight: "1px solid #222",
            height: "90%",
            borderRadius: "0 0 8px 8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Box textAlign={"center"} marginTop={"40px"}>
            <Typography marginBottom="20px" variant="h4">Altere os parametros desejados</Typography>
            <Typography variant="body1">
              Lembre-se de salvar antes de sair da página
            </Typography>
          </Box>
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '10%'
          }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                margin: "30px auto",
                gap: 3
              }}
            >
              <TextField id="name" label="Nome" variant="filled" />
              <TextField id="ano" label="Ano de início" variant="filled" />
            </Box>
            <Box sx={{ width: "200"}}>
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
