import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

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

const CreateClassesPage = () => {
  const [courseData, setCourseData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [pattern, setPattern] = useState(null);
  const [error, setError] = useState(""); // Para armazenar mensagens de erro
  const [classesDataToCompare, setClassesDataToCompare] = useState([]); // Para armazenar turmas existentes


  const navigate = useNavigate();

  const setCourseNamePattern = () => {
    const selectedCourse = courseData.find(data => data.id_curso === classData[0]?.course);
    if (selectedCourse) {
      setPattern(selectedCourse.padrao);
    }
  };

  const handleInputChange = (e, alterThis) => {
    const { value } = e.target;
    setClassData(prevState => {
      const updatedClass = { ...prevState[0], [alterThis]: value };
      return [updatedClass];
    });
  };

  // Função de validação dos campos
  const validateFields = () => {
    const currentClass = classData[0];

    // Verificar se todos os campos estão preenchidos
    if (!currentClass?.year) {
      setError("O campo 'Ano de Início' é obrigatório.");
      return false;
    }
    if (!currentClass?.course) {
      setError("O campo 'Curso' é obrigatório.");
      return false;
    }
    if (!currentClass?.name) {
      setError("O campo 'Nome' é obrigatório.");
      return false;
    }

    // Verificar se a turma já existe com base no 'name', 'year' e 'course'
    const isClassDuplicate = classesDataToCompare.some(existingClass =>
      existingClass.nome === currentClass.name &&
      existingClass.ano_inicio === currentClass.year &&
      existingClass.fk_curso_id_curso === currentClass.course
    );

    if (isClassDuplicate) {
      setError("Já existe uma turma com essas mesmas informações.");
      return false;
    }

    setError(""); // Sem erros
    return true;
  };

  const saveAndRedirect = async () => {
    if (validateFields()) {
      try {
        const response = await axios.post("http://localhost:3030/turmas/", {
          name: classData[0]?.name,
          start_year: classData[0]?.year,
          course: classData[0]?.course,
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
    // Buscar os dados das turmas para comparação
    const fetchClassesData = async () => {
      try {
        const existingClasses = await getClassesData();
        setClassesDataToCompare(existingClasses);
      } catch (error) {
        console.error("Erro ao buscar as turmas:", error);
      }
    };

    fetchClassesData();
  }, []);

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getCourseData();
        setCourseData(result);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
    setCourseNamePattern();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classData[0]?.course]);

  return (
    <CreatePage title="Criar Turma" buttonSaveFunction={saveAndRedirect} returnTo="/turmas">
      <FormControl fullWidth>
        <InputLabel id="ano-label">Ano de Início</InputLabel>
        <Select
          labelId="ano-label"
          id="ano_inicio"
          label="Ano de Início"
          onChange={(e) => handleInputChange(e, "year")}
          value={classData[0]?.year || ""}
        >
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map(startYear => (
            <MenuItem key={startYear} value={startYear}>
              {startYear}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="curso-label">Curso</InputLabel>
        <Select
          labelId="curso-label"
          id="curso"
          label="Curso"
          onChange={(e) => handleInputChange(e, "course")}
          value={classData[0]?.course || ""}
        >
          {courseData.map(course => (
            <MenuItem key={course.id_curso} value={course.id_curso}>
              {course.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="nome-label">Nome</InputLabel>
        <Select
          labelId="nome-label"
          id="nome"
          label="Nome"
          onChange={(e) => handleInputChange(e, "name")}
          value={classData[0]?.name || ""}
        >
          {pattern !== undefined
            ? [1, 2, 3].map(className => (
                <MenuItem key={className} value={"T" + className + pattern}>
                  T{className}
                  {pattern}
                </MenuItem>
              ))
            : [0].map(a => (
                <Alert severity="error" key={a}>
                  Escolha um curso!
                </Alert>
              ))}
        </Select>
      </FormControl>

      {/* Exibir erro apenas ao tentar salvar */}
      {error && <Alert severity="error">{error}</Alert>} 

    </CreatePage>
  );
};

export default CreateClassesPage;
