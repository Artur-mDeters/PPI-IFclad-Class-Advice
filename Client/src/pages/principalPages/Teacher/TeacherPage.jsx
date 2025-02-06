import UiAppBar from "../../../components/AppBar/AppBar";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import foto from "./img/fotos/padrao.png";
import getTeacher from "./core/getTeacher";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./TeacherPage.Style";
import { Box, Button, Typography, Paper } from "@mui/material";

const Teacher = () => {
  const [userData, setUserData] = useState([]);
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
    navigate("./create");
  };

  const redirectToProfessor = (id) => {
    navigate("/professores/" + id);
  };

  return (
    <UiAppBar title="Docentes">
      <SearchBar>
        <Button variant="contained" onClick={redirectToRegister}>
          Adicionar Professor
        </Button>
      </SearchBar>

      <Box sx={classes.boxProfessores}>
        {userData.map((user) => (
          <Paper
          key={user.id_usuario}
          elevation={8}
          sx={classes.paperProfessor}
        >
          <Box sx={classes.foto}>
            <img
              src={foto}
              style={classes.img}
              alt="foto do professor"
            />
          </Box>
          <Box sx={classes.typography_box}>
            <Typography variant="body">{user.nome}</Typography>
            <Typography variant="body">{user.siape}</Typography>
          </Box>
          <Button
            onClick={() => redirectToProfessor(user.id_usuario)}
            variant="contained"
          >
            Editar
          </Button>
        </Paper>
        
        ))}
      </Box>
    </UiAppBar>
  );
};

export default Teacher;
