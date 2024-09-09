import UiAppBar from "../../../components/AppBar/AppBar";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";

import { useEffect, useState } from "react";
import getCourseData from "./core/GetCourseData";
import { useNavigate } from "react-router-dom";
import classes from "./Course.Style"
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
} from "@mui/material";


const CoursePage = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);

  // ? -> funções de redirecionamento
  const redirectToCourseCreatePage = () => {
    navigate("/cursos/create");
  };

  function redirectToCourseEditPage(id) {
    navigate(`/cursos/edit/${id}`);
  }

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getCourseData();
        console.log(result);
        setCourseData(result);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
  }, []);

  return (
      <UiAppBar title={"Cursos"}>
        <SearchBar>
          <Button variant="contained" onClick={redirectToCourseCreatePage}>
            Adicionar Curso
          </Button>
        </SearchBar>
        <Box sx={classes.dataBox}>
          {courseData.map((curso) => (
            <Paper
              key={curso.id_curso}
              sx={classes.coursePaper}
              elevation={8}
            >
              <Box sx={classes.typographyBox}>
                <Typography variant="h4" sx={classes.nameClass}>{curso.nome}</Typography>
                <Divider />
                <Box sx={classes.BoxClasses}>
                  <Typography variant="h6">Turmas:⠀</Typography>
                  {[1,2,3].map((index) => {
                    if(index === 3) {
                      return (
                        <Typography variant="h6" key={index}> T{index}{curso.padrao}</Typography>
                      )
                    } else {
                      return (
                        <Typography variant="h6" key={index}> T{index}{curso.padrao}⠀</Typography>
                      )
                    }
                  })}
                </Box>
              </Box>
              <Box sx={classes.buttonBox}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => redirectToCourseEditPage(curso.id_curso)}
                >
                  Editar
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </UiAppBar>
  );
};

export default CoursePage;
