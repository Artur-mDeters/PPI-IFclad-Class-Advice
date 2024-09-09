import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Alert,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText
} from "@mui/material";
import axios from "axios";
import EditPage from "../../../../components/createAndEditPages/EditPage";
import ConfirmDeleteDialog from "../../../../components/UI/confirmDeleteDialog/ConfirmDeteteDialog";

const getCourseData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/cursos");
    return response.data;
  } catch (err) {
    console.error(err);
    return []; // Retorna um array vazio em caso de erro
  }
};

const getClassesData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/turmas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};

const getDataClassByID = async (id) => {
  try {
    const response = await axios.get("http://localhost:3030/turmas/"+id);
    return response.data[0];
  } catch (err) { 
    throw new Error(err);
  }
};

const EditClassesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState([]);
  const [pattern, setPattern] = useState();
  const [classData, setClassData] = useState({
    name: "",
    age: "",
    course: "",
  });
  const [errors, setErrors] = useState({ name: "", age: "", course: "" }); // Para erros específicos
  const [classesDataToCompare, setClassesDataToCompare] = useState([]); // Para armazenar turmas existentes
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar o diálogo de exclusão

  const setCourseNamePattern = () => {
    const selectedCourse = courseData.find(data => data.id_curso === classData?.course);
    if (selectedCourse) {
      setPattern(selectedCourse.padrao);
    }
  };

  const handleInput = (e, alterThis) => {
    const { value } = e.target;
    setClassData((prevState) => ({
      ...prevState,
      [alterThis]: value,
    }));
  };

  const validateFields = () => {
    const currentClass = classData;
    const newErrors = { name: "", age: "", course: "" };
    let valid = true;

    if (!currentClass?.age) {
      newErrors.age = "O campo 'Ano de Início' é obrigatório.";
      valid = false;
    }
    if (!currentClass?.course) {
      newErrors.course = "O campo 'Curso' é obrigatório.";
      valid = false;
    }
    if (!currentClass?.name) {
      newErrors.name = "O campo 'Nome' é obrigatório.";
      valid = false;
    } else if (!currentClass?.course) {
      newErrors.name = "Escolha um curso primeiro.";
      valid = false;
    }

    // Verificar se a turma já existe com base no 'name', 'age' e 'course'
    const isClassDuplicate = classesDataToCompare.some((existingClass) =>
      existingClass.id !== id &&
      existingClass.nome === currentClass.name &&
      existingClass.ano_inicio === currentClass.age &&
      existingClass.fk_curso_id_curso === currentClass.course
    );

    if (isClassDuplicate) {
      newErrors.name = "Já existe uma turma com essas mesmas informações.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const saveAndRedirect = async () => {
    if (validateFields()) {
      try {
        await axios.put(`http://localhost:3030/turmas/editar/${id}`, {
          name: classData?.name,
          start_year: classData?.age,
          id_course: classData?.course,
        });
        navigate("/turmas");
      } catch (err) {
        console.error("Erro ao atualizar a turma:", err);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/turmas/${id}`);
      navigate("/turmas");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const existingClasses = await getClassesData();
        const classToEdit = await getDataClassByID(id);

        setClassesDataToCompare(existingClasses);
        setClassData(classToEdit);

      } catch (error) {
        console.error(error);
      }
    };
    
    setData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getCourseData();
        setCourseData(result);
        setCourseNamePattern();
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, classData.course]);

  return (
    <>
      <EditPage
        title="Turma"
        buttonSaveFunction={saveAndRedirect}
        buttonExcludeFunction={() => setDialogOpen(true)} // Abre o diálogo de exclusão
        buttonExcludeName="Excluir Turma"
        returnTo="/turmas"
      >
        <FormControl fullWidth margin="dense" error={!!errors.course}>
          <InputLabel id="curso">Curso</InputLabel>
          <Select
            labelId="curso"
            id="curso"
            label="Curso"
            onChange={(e) => handleInput(e, "course")}
            value={classData.course || ""}
          >
            {courseData.map((course) => (
              <MenuItem key={course.id_curso} value={course.id_curso}>
                {course.nome}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.course}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense" error={!!errors.name}>
          <InputLabel id="nome">Nome</InputLabel>
          <Select
            labelId="nome"
            id="nome"
            label="Nome"
            onChange={(e) => handleInput(e, "name")}
            value={classData.name || ""}
            disabled={!classData.course} // Desabilita o campo se o curso não for selecionado
          >
            {pattern !== undefined
              ? [1, 2, 3].map((className) => (
                  <MenuItem key={className} value={"T" + className + pattern}>
                    {"T" + className + pattern}
                  </MenuItem>
                ))
              : [0].map((a) => (
                  <Alert severity="error" key={a}>
                    Escolha um curso!
                  </Alert>
                ))}
          </Select>
          <FormHelperText>
            {!classData.course ? "Escolha um curso primeiro." : errors.name}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense" error={!!errors.age}>
          <InputLabel id="ano">Ano de Início</InputLabel>
          <Select
            labelId="ano"
            id="ano"
            label="Ano de Início"
            onChange={(e) => handleInput(e, "age")}
            value={classData.age || ""}
          >
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
          </Select>
          <FormHelperText>{errors.age}</FormHelperText>
        </FormControl>
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

export default EditClassesPage;
