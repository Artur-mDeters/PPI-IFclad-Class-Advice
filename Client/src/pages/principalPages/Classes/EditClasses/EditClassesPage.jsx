import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Alert,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import EditPage from "../../../../components/createAndEditPages/EditPage";

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
  const [error, setError] = useState(""); // Para armazenar mensagens de erro
  const [classesDataToCompare, setClassesDataToCompare] = useState([]); // Para armazenar turmas existentes

  const setCourseNamePattern = () => {
    courseData.map((data) => {
      if (data.id_curso == classData?.course) {
        setPattern(data.padrao);
      }
    });
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
    
    // Verificar se todos os campos estão preenchidos
    if (!currentClass?.age) {
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

    // Verificar se a turma já existe com base no 'name', 'age' e 'course'
    const isClassDuplicate = classesDataToCompare.some((existingClass) =>
      existingClass.id !== id &&
      existingClass.nome === currentClass.name &&
      existingClass.ano_inicio === currentClass.age &&
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
        await axios.put(`http://localhost:3030/turmas/editar/${id}`, {
          name: classData?.name,
          start_year: classData?.age,
          course: classData?.course,
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
  }, [id, classData.course]);

  return (
    <EditPage
      title="Editar Turma"
      buttonSaveFunction={saveAndRedirect}
      buttonExcludeFunction={handleDelete}
      buttonExcludeName="Excluir Turma"
      returnTo="/turmas"
    >
      <FormControl fullWidth>
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
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="nome">Nome</InputLabel>
        <Select
          labelId="nome"
          id="nome"
          label="Nome"
          onChange={(e) => handleInput(e, "name")}
          value={classData.name || ""}
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
      </FormControl>
      <FormControl fullWidth>
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
      </FormControl>

      {error && <Alert severity="error">{error}</Alert>} {/* Exibir erros, se houver */}
    </EditPage>
  );
};

export default EditClassesPage;
  