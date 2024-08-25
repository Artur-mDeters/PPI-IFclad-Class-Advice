import { ThemeProvider } from "@emotion/react"
import { CssBaseline, Button, Box, Paper, Typography} from "@mui/material"
import UiAppBar from "../../../../components/AppBar/AppBar"
import { defaultDark } from "../../../../themes/themes"
import SearchBar from "../../../../components/UI/SearchBar/SearchBar"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react" 
import axios from "axios"


const Alunos = () => {
  const [dataAluno, setDataAluno] = useState([]); 

  const { idTurma } = useParams();
  const navigate = useNavigate();

  const redirectToAddAluno = () => {
    navigate("AddAlunos/");
  }

  const getDataAlunos = async () => {
    const response = await axios.get("http://localhost:3030/alunos/"+idTurma)
    try {
      return response.data
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataAlunos();
        console.log(result);
        setDataAluno(result);
        
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
                <Button variant="contained" sx={{marginRight: "15px"}} onClick={() => redirectToAddAluno(idTurma)}>Adicionar Alunos</Button>
                <Button variant="contained">Notas da Turma</Button>
            </SearchBar>
            <Box>
                {dataAluno.map((aluno) => (
                  <Paper key={aluno.id_aluno} elevation={8} sx={{margin: '10px'}}> 
                    <Typography variant="body1" >{aluno.nome}</Typography>
                    <Typography variant="body1" >{aluno.matricula}</Typography>
                    <Typography variant="body1" >{aluno.email}</Typography>
                  </Paper>
                ))} 
            </Box>
        </UiAppBar>
    </ThemeProvider>
  )
}

export default Alunos
