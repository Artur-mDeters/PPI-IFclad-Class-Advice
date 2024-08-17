import UiAppBar from "../../../components/AppBar/AppBar";
import { Box, Button, CssBaseline, ThemeProvider, Typography, Paper} from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import { defaultDark } from "../../../themes/themes";
import { useState, useEffect } from "react";
import getTeacher from "./core/getTeacher";
import { useNavigate } from "react-router-dom";


const Professores = () => {
  const [userData, setUserData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTeacher();
        setUserData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    console.log(typeof dataTurmas, "data profs");
    console.log(userData, "professores");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToRegister = () => {
    navigate('/register')
  }

  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <UiAppBar>
        <SearchBar>
          <Button variant="contained" onClick={redirectToRegister}>Adicionar Professor</Button>
        </SearchBar>
     
        <Box>
          {userData.map((user) => (
            <Paper item key={user.id_usuario} sx={{padding: 1, margin: 1}}>
  
                <Typography variant="body">{user.nome}    |    Siape: </Typography>
                <Typography variant="body">{user.siape}    |</Typography>
              
            </Paper> 
          ))}
          
        </Box>
      </UiAppBar>
    </ThemeProvider>
  )
}

export default Professores