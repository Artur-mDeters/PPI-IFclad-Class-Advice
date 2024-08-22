import { ThemeProvider } from "@emotion/react"
import { CssBaseline, Button, Box } from "@mui/material"
import UiAppBar from "../../../../components/AppBar/AppBar"
import { defaultDark } from "../../../../themes/themes"
import SearchBar from "../../../../components/UI/SearchBar/SearchBar"
import { useNavigate, useParams } from "react-router-dom"

const Alunos = () => {
  const { idTurma } = useParams();
  const navigate = useNavigate();

  const redirectToAddAluno = () => {
    navigate("AddAlunos/");
  }

  return (
    <ThemeProvider theme={defaultDark}>
        <CssBaseline />
        <UiAppBar>
            <SearchBar>
                <Button variant="contained" sx={{marginRight: "15px"}} onClick={() => redirectToAddAluno(idTurma)}>Adicionar Alunos</Button>
                <Button variant="contained">Notas da Turma</Button>
            </SearchBar>
            <Box>
                
            </Box>
        </UiAppBar>
    </ThemeProvider>
  )
}

export default Alunos
