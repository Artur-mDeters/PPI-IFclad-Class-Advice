import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Chip,
  Stack, 
  Typography,
  Checkbox,
  ListItemText
} from "@mui/material";

const getCourseData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/cursos");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getClassesData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/turmas");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getSubjectsData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/disciplina/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    throw error;
  }
};

const CreateClassesPage = () => {
  const [courseData, setCourseData] = useState([]);
  const [classData, setClassData] = useState({
    name: "",
    year: "",
    course: "",
    subjects: [],
  });
  
  const [pattern, setPattern] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(""); // Para armazenar mensagens de erro
  const [classesDataToCompare, setClassesDataToCompare] = useState([]); // Para armazenar turmas existentes
  const [errors, setErrors] = useState({ name: "", year: "", course: "" });
  const [subjectsData, setSubjectsData] = useState([]);
   // Para erros específicos

  const navigate = useNavigate(); 

  const setCourseNamePattern = () => {
    const selectedCourse = courseData.find(
      (data) => data.id_curso === classData?.course
    );
    if (selectedCourse) {
      setPattern(selectedCourse.padrao);
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setClassData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  

  const handleSubjectsChange = (e) => {
    const { value } = e.target;
    setClassData((prevState) => ({
      ...prevState,
      subjects: value,
    }));
  };
  

  // Função de validação dos campos
  const validateFields = () => {
    const currentClass = classData;
    const newErrors = { name: "", year: "", course: "" };
    let valid = true;

    if (!currentClass?.year) {
      newErrors.year = "O campo 'Ano de Início' é obrigatório.";
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

    // Verificar se a turma já existe com base no 'name', 'year' e 'course'
    const isClassDuplicate = classesDataToCompare.some(
      (existingClass) =>
        existingClass.nome === currentClass.name &&
        existingClass.ano_inicio === currentClass.year &&
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
        const response = await axios.post("http://localhost:3030/turmas/", {
          name: classData?.name,
          start_year: classData?.year,
          course: classData?.course,
          subjects: classData.subjects
        });
        console.log(response.data);

        // Limpar dados e redirecionar após o sucesso
        setClassData([]); // Limpa os dados da turma
        setCourseData([]); // Limpa os dados do curso

        navigate("/turmas"); // Redireciona para a página de turmas
      } catch (err) {
        console.error("Erro ao salvar a turma:", err);
      }
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [courses, classes, subjects] = await Promise.all([
          getCourseData(),
          getClassesData(),
          getSubjectsData(),
        ]);
        setCourseData(courses);
        setClassesDataToCompare(classes);
        setSubjectsData(subjects);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    fetchAllData();
  }, []);
  

  useEffect(() => {
    setCourseNamePattern();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classData?.course]);

  return (
    <CreatePage
      buttonSaveFunction={saveAndRedirect}
      returnTo="/turmas"
      Title="Turmas"
    >
      <FormControl fullWidth margin="dense" error={!!errors.course}>
        <InputLabel id="curso-label">Curso</InputLabel>
        <Select
          labelId="curso-label"
          id="curso"
          label="Curso"
          onChange={(e) => handleInputChange(e, "course")}
          value={classData?.course || ""}
        >
          {courseData.map((course) => (
            <MenuItem key={course.id_curso} value={course.id_curso}>
              <Typography variant="body1" flex={1} >{course.nome}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip color="primary" label={"padrão: T "+course.padrao} />
                {/* <Chip color="primary" label={"T2"+course.padrao} />
                <Chip color="primary" label={"T3"+course.padrao} /> */}
              </Stack>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.course}</FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="dense" error={!!errors.name}>
        <InputLabel id="nome-label">Nome</InputLabel>
        <Select
          labelId="nome-label"
          id="nome"
          label="Nome"
          onChange={(e) => handleInputChange(e, "name")}
          value={classData?.name || ""}
          disabled={!classData?.course} // Desabilita o campo se o curso não for selecionado
        >
          {pattern !== undefined
            ? [1, 2, 3].map((className) => (
                <MenuItem key={className} value={"T" + className + pattern}>
                  T{className}
                  {pattern}
                </MenuItem>
              ))
            : [0].map((a) => (
                <Alert severity="error" key={a}>
                  Escolha um curso!
                </Alert>
              ))}
        </Select>
        <FormHelperText>
          {!classData?.course ? "Escolha um curso primeiro." : errors.name}
        </FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="dense" error={!!errors.year}>
        <InputLabel id="ano-label">Ano de Início</InputLabel>
        <Select
          labelId="ano-label"
          id="ano_inicio"
          label="Ano de Início"
          onChange={(e) => handleInputChange(e, "year")}
          value={classData?.year || ""}
        >
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((startYear) => (
            <MenuItem key={startYear} value={startYear}>
              {startYear}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.year}</FormHelperText>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="subjects">Disciplinas</InputLabel>
        <Select
          labelId="subjects"
          label="Disciplinas"
          id="subjects"
          name="subjects"
          multiple
          value={classData.subjects} // Array de IDs selecionados
          onChange={handleSubjectsChange}
          renderValue={(selected) =>
            subjectsData
              .filter((subject) => selected.includes(subject.id_disciplina))
              .map((subject) => subject.nome)
              .join(", ")
          }
        >
          {subjectsData.map((option) => (
            <MenuItem key={option.id_disciplina} value={option.id_disciplina}>
              <Checkbox
                checked={classData.subjects.includes(option.id_disciplina)}
              />
              <ListItemText primary={option.nome} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Exibir erro apenas ao tentar salvar */}
      {error && <Alert severity="error">{error}</Alert>}
    </CreatePage>
  );
};

export default CreateClassesPage;
