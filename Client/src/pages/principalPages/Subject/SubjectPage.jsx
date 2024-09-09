import axios from "axios";
import UiAppBar from "../../../components/AppBar/AppBar";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Subject.Style";
import { Box, Button, Paper, Typography } from "@mui/material";

const getSubjectData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/disciplina");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

const SubjectPage = () => {
  const [subjectData, setSubjectData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const response = await getSubjectData();
      setSubjectData(response);
    };

    setData();
  }, []);

  const redirectToCreateSubjectPage = () => {
    navigate("./create");
  };

  return (
    <UiAppBar>
      <SearchBar>
        <Button variant="contained" onClick={redirectToCreateSubjectPage}>
          Adicionar Disciplina
        </Button>
      </SearchBar>
      <Box sx={classes.boxAlunos}>
        {subjectData.map((subject) => (
          <Paper
            key={subject.id_aluno}
            elevation={8}
            sx={classes.paperSubject}
            // onClick={() => redirectToEditAluno(aluno.id_aluno)}
          >
            <Box>
              <Typography variant="h5">{subject.nome}</Typography>
              <Typography variant="body1">{subject.matricula}</Typography>
              <Button variant="contained">editar disciplina</Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </UiAppBar>
  );
};

export default SubjectPage;
