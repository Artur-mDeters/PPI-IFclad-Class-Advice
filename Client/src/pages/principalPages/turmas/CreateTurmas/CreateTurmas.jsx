import { ThemeProvider, CssBaseline } from "@mui/material"
import { defaultDark } from "../../../../themes/themes"

const CreateTurmas = () => {
  return (
    <ThemeProvider theme={defaultDark}>
        <CssBaseline />
        Criar turmas
        <a href="/turmas">Voltar</a>
    </ThemeProvider>
  )
}

export default CreateTurmas
