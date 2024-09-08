import {
  Box,
  Button,
  Typography,
  Paper,

} from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../../components/UI/SearchBar/SearchBar.jsx";
import { useEffect, useState } from "react";

import UiAppBar from "../../../components/AppBar/AppBar.jsx";
import { useNavigate } from "react-router-dom";
import getDataTurmas from "./core/GetDataTurmas.jsx";
import classes from "./ClassesPage.Style.js";
import Theme from "../../../theme.jsx";

// ? Styles #########################

const ClassesPage = () => {
  const [classData, setClassData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getDataTurmas();
        setClassData(result);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function redirectToClassEdit(id) {
    navigate(`editar/${id}`);
  }

  function redirectToClassCreation() {
    navigate("create");
  }

  function redirectToStudentPage(id) {
    navigate("/turmas/"+id+"/alunos/")
  }

  return (
    <Theme>
      <UiAppBar title={"Turmas"}>
        <SearchBar sx={classes.searchbar}>
          <Button
            variant="contained"
            sx={classes.buttonAddTurma}
            onClick={redirectToClassCreation}
          >
            Adicionar Turma
          </Button>
          
        </SearchBar>
        <Box sx={classes.boxTurmas}>
          {classData.map((turma) => (
            <Paper key={turma.id_turma} elevation={8} sx={classes.paperTurma}>
              <Box sx={classes.flex1} onClick={() => redirectToStudentPage(turma.id_turma)}>
                <Typography variant="h4" mb={5}>
                  {turma.nome}
                </Typography>
                <Typography variant="body1">Ano: {turma.ano_inicio}</Typography>
              </Box>
              <Box sx={classes.buttonBoxPaper}>
                <Button
                  variant="contained"
                  onClick={() => {
                    redirectToClassEdit(turma.id_turma);
                  }}
                >
                  Editar
                </Button>
                <Button variant="contained">Notas</Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </UiAppBar>
    </Theme>
  );
};

export default ClassesPage;
