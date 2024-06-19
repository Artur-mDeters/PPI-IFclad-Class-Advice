import { Box, Typography, TextField, ThemeProvider, CssBaseline, Button} from '@mui/material'
import { defaultDark } from '../../../../themes/themes'

   

const EditarTurmas = () => {

  const navigate = useNavigate()

  const saveAndRedirect = () => {
    navigate('/turmas')
  }

  return (
    <ThemeProvider theme={defaultDark}>
        <CssBaseline />
        <Box sx={{
            width: '100%',
            height: '100%'
        }}>
            <Box sx={{
                width: '100%',
                height: '60px',
                backgroundColor: '#5d1c8b'
            }}>
                <Typography variant="h3" >Editar turmas</Typography>
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
