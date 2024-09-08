import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { TextField, Typography, Box } from "@mui/material/";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    let formattedValue = value;

    if (id === "pattern") {
      if (formattedValue.length > 1) {
        return;
      } else {
        formattedValue = value.replace(/[^\d]/g, "");
      }
    } else if (id === "courseName") {
      formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    }

    try {
      setCourseData((prevState) => {
        const inputsChange = { ...prevState[0], [id]: formattedValue };
        return [inputsChange];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const saveAndRedirect = async () => {
    await axios
      .post("http://localhost:3030/cursos", {
        name: courseData[0]?.courseName,
        pattern: courseData[0]?.pattern,
      })
      .then((response) => {
        console.log(response);
        navigate("/cursos");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <CreatePage
      title="Criar Novo Curso"
      buttonSaveFunction={saveAndRedirect}
      returnTo="/cursos"
    >
      <Box width={"100%"} textAlign={"center"} >
        <TextField
          fullWidth
          id="courseName"
          label="Nome"
          value={courseData[0]?.courseName}
          onChange={handleInputChange}
          margin="dense"
        />
        <Box>
          <TextField
            id="pattern"
            label="Padrão de nome de turma"
            margin="dense"
            value={courseData[0]?.pattern}
            onChange={handleInputChange}
          />
        </Box>
      </Box>
      <Typography variant="body1" textAlign="center">
        O padrão de nome de turma segue o formato T+(número do período)+(número
        do curso), onde o último número identifica o curso técnico. Insira o
        número que corresponde ao curso!
      </Typography>
    </CreatePage>
  );
};

export default CreateCourse;
