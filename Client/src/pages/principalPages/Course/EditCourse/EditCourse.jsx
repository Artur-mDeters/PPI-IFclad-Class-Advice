import EditPage from "../../../../components/createAndEditPages/EditPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import ConfirmDeleteDialog from "../../../../components/UI/confirmDeleteDialog/ConfirmDeteteDialog";

const getTeachersData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/professores");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({ nome: "", padrao: "", coordenador: "" });
  const [errors, setErrors] = useState({ nome: "", padrao: "", coordenador: "" });
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar o diálogo de exclusão
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await axios.get("http://localhost:3030/cursos/" + id);
        setCourseData(result);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTeachers = async () => {
      try {
        const teachers = await getTeachersData();
        setTeacherData(teachers);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
    fetchTeachers();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "padrao") {
      if (formattedValue.length > 1) {
        return;
      } else {
        formattedValue = value.replace(/[^\d]/g, "");
      }
    } else if (name === "nome") {
      formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    }

    setCourseData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  const handleCoordinatorChange = (e) => {
    setCourseData((prevState) => ({
      ...prevState,
      coordenador: e.target.value,
    }));
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = { nome: "", padrao: "", coordenador: "" };

    if (!courseData.nome) {
      newErrors.nome = "O nome do curso é obrigatório.";
      valid = false;
    }

    if (!courseData.padrao || courseData.padrao.length !== 1) {
      newErrors.padrao = "O padrão deve ser um número de 1 dígito.";
      valid = false;
    }

    if (!courseData.coordenador) {
      newErrors.coordenador = "O coordenador é obrigatório.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const saveAndRedirect = async () => {
    if (validateFields()) {
      try {
        const response = await axios.put(
          "http://localhost:3030/cursos/edit/" + id,
          {
            name: courseData.nome,
            pattern: courseData.padrao,
            coordinator: courseData.coordenador, // Adiciona o coordenador
          }
        );
        console.log(response);
        navigate("/cursos");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/cursos/${id}`);
      navigate("/cursos");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <EditPage
        title="Curso"
        buttonSaveFunction={saveAndRedirect}
        buttonExcludeFunction={handleDeleteClick}
        buttonExcludeName="Excluir Curso"
        returnTo="/cursos"
      >
        <Box width={"100%"} textAlign={"center"}>
          <TextField
            fullWidth
            id="nameCourse"
            name="nome"
            label="Nome"
            value={courseData.nome || ""}
            onChange={handleInputChange}
            margin="dense"
            error={!!errors.nome}
            helperText={errors.nome}
          />
          <FormControl fullWidth margin="dense" error={!!errors.coordenador}>
            <InputLabel id="labelCoordenador">Coordenador</InputLabel>
            <Select
              labelId="labelCoordenador"
              value={courseData.coordenador || ""}
              onChange={handleCoordinatorChange}
              label="Coordenador"
            >
              {teacherData.map((teacher) => (
                <MenuItem key={teacher.id_usuario} value={teacher.id_usuario}>
                  {teacher.nome}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.coordenador}</FormHelperText>
          </FormControl>
          <Box>
            <TextField
              name="padrao"
              label="Padrão de nome de turma"
              margin="dense"
              value={courseData.padrao || ""}
              onChange={handleInputChange}
              error={!!errors.padrao}
              helperText={errors.padrao}
            />
          </Box>
          
        </Box>
        <Typography variant="body1" textAlign="center">
          O padrão de nome de turma segue o formato T+(número do período)+(número do curso), onde o último número identifica o curso técnico. Insira o número que corresponde ao curso!
        </Typography>
      </EditPage>

      <ConfirmDeleteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        textAlert="este curso ( incluindo os alunos )"
      />
    </>
  );
};

export default EditCourse;
