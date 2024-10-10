import { Button, Box, Paper, Typography } from "@mui/material";
import UiAppBar from "../../../../components/AppBar/AppBar";
// import { defaultDark } from "../../../../themes/themes"
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import padrao from "./img/fotos/padrao.png";

import classes from "./StudentPage.Style";

const Alunos = () => {
  const [dataAluno, setDataAluno] = useState([]);

  const { idTurma } = useParams();
  const navigate = useNavigate();

  const redirectToAddAluno = () => {
    navigate("AddAlunos/");
  };
  const redirectToEditAluno = (id) => {
    navigate("./EditAluno/" + id);
  };

  const getDataAlunos = async () => {
    const response = await axios.get(
      "http://localhost:3030/" + idTurma + "/alunos/"
    );
    try {
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UiAppBar title={"Alunos"}>
      <SearchBar>
        <Button
          variant="contained"
          sx={{ marginRight: "15px" }}
          onClick={() => redirectToAddAluno(idTurma)}
        >
          Adicionar Alunos
        </Button>
        <Button variant="contained">Notas da Turma</Button>
      </SearchBar>
      <Box sx={classes.boxAlunos}>
        {dataAluno.map((aluno) => (
          <Paper
            key={aluno.id_aluno}
            elevation={8}
            sx={classes.paperAluno}
            onClick={() => redirectToEditAluno(aluno.id_aluno)}
          >
            <Box sx={classes.foto}>
              <img
                src={padrao}
                alt="Imagem do aluno"
                style={{ height: "130px", borderRadius: "5px" }}
              />
            </Box>
            <Box sx={{flex: 1}}>
              <Typography variant="h6">{aluno.nome}</Typography>
              
            </Box>
            <Box >
              <Button fullWidth variant="contained">ver notas</Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </UiAppBar>
  );
};

export default Alunos;
