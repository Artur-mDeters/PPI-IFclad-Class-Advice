import { ThemeProvider,  CssBaseline, Typography, Box} from "@mui/material"
import { defaultDark } from "../../themes/themes"
import classes from "./Error.style"



const ErrorPage = () => {
  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <Box sx={classes.box_error}>
        <Typography variant="h1" >:/ Ocorreu um erro...
        </Typography>
        <a href="/"><Typography variant="h5">← Retorne a página inicial</Typography></a>
      </Box>
    </ThemeProvider>
  )
}

export default ErrorPage