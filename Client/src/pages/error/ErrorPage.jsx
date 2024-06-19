import { ThemeProvider,  CssBaseline, Typography, Box} from "@mui/material"
import { defaultDark } from "../../themes/themes"



const ErrorPage = () => {
  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <Box sx={{  
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 50,
        textAlign: 'center'
      }}>
        <Typography variant="h1" >:/ Ocorreu um erro...</Typography>
        <a href="/"><Typography variant="h5">← Retorne a página inicial</Typography></a>
      </Box>
    </ThemeProvider>
  )
}

export default ErrorPage