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
} from "@mui/material";

const getDataCursos = async () => {
  try {
    const response = await axios.get("http://localhost:3030/cursos");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const CreateTurmas = () => {
  // Esse código tá medonho 😱😱😱🤓
  // TODO: refatorar a inserção de dados de turma, colocando todos os parâmetros em um só State
  const [courseData, setCourseData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [pattern, setPattern] = useState();

  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCourseNamePattern = () => {
    courseData.map((data) => {
      if (data.id_curso == classData[0]?.course) {
        setPattern(data.padrao);
      }
    });
  };

  const handleInputChange = (e, alterThis) => {
    const { value } = e.target;
    setClassData((prevState) => {
      const updatedClass = { ...prevState[0], [alterThis]: value };
      return [updatedClass];
    });
  };

  const saveAndRedirect = async () => {
    await axios
      .post("http://localhost:3030/turmas/", {
        nome: classData[0]?.name,
        ano_inicio: classData[0]?.age,
        curso: classData[0]?.course,
      })
      .then((response) => {
        console.log(response);
        setCourseData("");
        navigate("/turmas");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getDataCursos();
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
    <CreatePage
      title="Criar Turma"
      buttonSaveFunction={saveAndRedirect}
      returnTo="/turmas"
    >
      <FormControl fullWidth>
        <InputLabel id="ano-label">Ano de Início</InputLabel>
        <Select
          labelId="ano-label"
          id="ano_inicio"
          label="Ano de Início"
          onChange={(e) => handleInputChange(e, "age")}
          value={classData[0]?.age || ""}
        >
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((startYear) => (
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
          {courseData.map((course) => (
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
          {pattern != undefined
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
      </FormControl>
    </CreatePage>
  );
};

export default CreateTurmas;
