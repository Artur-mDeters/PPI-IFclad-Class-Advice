import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";

// Função para obter os dados das disciplinas do servidor
const getSubjectsData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/disciplina/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    throw error;
  }
};

const AddTeacher = () => {
  const navigate = useNavigate();
  const [subjectsData, setSubjectsData] = useState([]);

  // Estado para os dados do professor
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    siape: "",
    subjects: [], // Armazena apenas IDs das disciplinas
  });

  // Efeito para buscar as disciplinas quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubjectsData();
        setSubjectsData(data);
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
      }
    };
    fetchData();
  }, []);

  // Função para lidar com a mudança nos inputs de texto
  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança no Select de disciplinas
  const handleSubjectsChange = (e) => {
    const { value } = e.target;
    setTeacherData((prevState) => ({
      ...prevState,
      subjects: value, // Atualiza os IDs selecionados
    }));
  };

  const saveAndRedirect = async () => {
    try {
      await axios.post("http://localhost:3030/professores", {
        name: teacherData.name,
        email: teacherData.email,
        siape: teacherData.siape,
        subjects: teacherData.subjects, // Apenas os IDs das disciplinas são enviados
      });
      navigate("/professores");
    } catch (err) {
      console.error("Erro ao salvar o professor:", err);
    }
  };

  return (
    <CreatePage Title={"Docente"} buttonSaveFunction={saveAndRedirect} returnTo={"/professores"}>
      <TextField
        id="teacherName"
        name="name"
        label="Nome do Docente"
        value={teacherData.nome}
        onChange={handleInputsChange}
      />
      <TextField
        id="teacherEmail"
        name="email"
        label="Email do Docente"
        value={teacherData.email}
        onChange={handleInputsChange}
      />
      <TextField
        id="teacherSIAPE"
        name="siape"
        label="SIAPE do Docente"
        value={teacherData.siape}
        onChange={handleInputsChange}
      />
      <FormControl fullWidth>
        <InputLabel id="subjects">Disciplinas</InputLabel>
        <Select
          labelId="subjects"
          label="Disciplinas"
          id="subjects"
          name="subjects"
          multiple
          value={teacherData.subjects} // Array de IDs selecionados
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
                checked={teacherData.subjects.includes(option.id_disciplina)}
              />
              <ListItemText primary={option.nome} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CreatePage>
  );
};

export default AddTeacher;
