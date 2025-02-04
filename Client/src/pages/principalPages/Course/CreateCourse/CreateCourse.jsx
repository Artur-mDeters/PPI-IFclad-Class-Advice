import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  Box,
  FormHelperText,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material/";
import classes from "./CreateCourse.stle";


const getTeachersData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/professores");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

const CreateCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [errors, setErrors] = useState({ courseName: "", pattern: "", coordinator: "" }); // Estados de erro
  const [teacherData, setTeacherData] = useState([]);
  const [coordinator, setCoordinator] = useState(""); // Estado para coordenador

  useEffect(() => {
    const setData = async () => {
      const response = await getTeachersData();
      setTeacherData(response);
    };

    setData();
  }, []);

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
      formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    }

    setCourseData((prevState) => {
      const inputsChange = { ...prevState[0], [id]: formattedValue };
      return [inputsChange];
    });
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = { courseName: "", pattern: "", coordinator: "" };

    // Verifica se o campo 'courseName' está preenchido
    if (!courseData[0]?.courseName) {
      newErrors.courseName = "O nome do curso é obrigatório.";
      valid = false;
    }

    // Verifica se o campo 'pattern' está preenchido corretamente
    if (!courseData[0]?.pattern || courseData[0]?.pattern.length !== 1) {
      newErrors.pattern = "O padrão deve ser um número de 1 dígito.";
      valid = false;
    }

    // Verifica se o campo 'coordenador' foi selecionado
    if (!coordinator) {
      newErrors.coordinator = "O coordenador é obrigatório.";
      valid = false;
    }

    setErrors(newErrors);
    return valid; 
  };

  const saveAndRedirect = async () => {
    if (validateFields()) {
      await axios
        .post("http://localhost:3030/cursos", {
          name: courseData[0]?.courseName,
          pattern: courseData[0]?.pattern,
          coordinator: coordinator, // Adiciona o coordenador ao post
        })
        .then((response) => {
          console.log(response);
          navigate("/cursos");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <CreatePage
      Title="Curso"
      buttonSaveFunction={saveAndRedirect}
      returnTo="/cursos"
    >
      <Box width={"100%"} textAlign={"center"}>
        <TextField
          fullWidth
          id="courseName"
          label="Nome"  
          value={courseData[0]?.courseName || ""}
          onChange={handleInputChange}
          margin="dense"
          error={!!errors.courseName} // Mostra o erro
          helperText={errors.courseName} // Mensagem de erro
        />
        <FormControl fullWidth margin="dense" error={!!errors.coordinator}>
          <InputLabel id="labelCoordenador">Coordenador</InputLabel>
          <Select
            labelId="labelCoordenador"
            id="coordinator"
            value={coordinator}
            onChange={(e) => setCoordinator(e.target.value)}
            label="Coordenador"
          >
            {teacherData.map((teacher) => (
              <MenuItem key={teacher.id_usuario} value={teacher.id_usuario}>
                {teacher.nome}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.coordinator}</FormHelperText>
        </FormControl>
        <Box>
          <TextField
            id="pattern"
            label="Padrão de nome de turma"
            margin="dense"
            value={courseData[0]?.pattern || ""} 
            onChange={handleInputChange}
            error={!!errors.pattern} // Mostra o erro
            helperText={errors.pattern} // Mensagem de erro
          />
        </Box>
      </Box>
      <Typography variant="body1" textAlign="center" sx={classes.Box_aviso}>
        O padrão de nome de turma segue o formato T+(número do período)+(número
        do curso), onde o último número identifica o curso técnico. Insira o
        número que corresponde ao curso!
      </Typography>
    </CreatePage>
  );
};

export default CreateCourse;
// teste