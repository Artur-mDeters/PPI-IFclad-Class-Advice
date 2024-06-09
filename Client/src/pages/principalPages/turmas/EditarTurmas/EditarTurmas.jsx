import { Box, Typography, TextField, ThemeProvider, CssBaseline, Button} from '@mui/material'
import { defaultDark } from '../../../../themes/themes'

   

const EditarTurmas = () => {
    

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
            <Box display='flex' flexDirection='column' width='300px'>
                <TextField
                  id="name"
                  label="Nome"
                  variant='filled'
                  
                />
                <TextField
                  id="ano"
                  label="Ano de início"
                  variant='filled'
                />
                <Button variant='contained'>
                    Salvar
                </Button>
                <Button color='error' variant='contained'> 
                    Cancelar
                </Button>
            </Box>
        </Box>
    </ThemeProvider>
  )
}

export default EditarTurmas
